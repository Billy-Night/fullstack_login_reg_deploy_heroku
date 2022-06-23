import React, { useContext } from "react";
import { MyContext } from "../../context/MyProvider.js";
import { useNavigate } from 'react-router-dom';
import './Login.css'

const Login = () => {
    const context = useContext(MyContext);
    const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault();
        fetch("https://login-and-registration-full.herokuapp.com/api/log", {
            method: "POST", 
            headers: new Headers({
                "Content-Type": "application/json",
            }),
            body: JSON.stringify({
                email: context.userCred.email,
                password: context.userCred.password
            })
        })
        .then((response) => {
            if (response.status === 500) {
                context.setUserCred(context.user);
                navigate("/error");
            }
            return response.json()
        })
        .then((data) => {
            console.log(data);
            let userData = {
                email: context.userCred.email,
                password: "",
                name: data.name,
                city: data.city,
                age: data.age,
                token: data.token,
            };
            context.setUserCred(userData);
            context.setLoggedIn(true);
            navigate("/profile");
        });
    };

    return (
        <div className="login-container">
            <h1>Sign In</h1>
            <form onSubmit={handleLogin}>
                <label htmlFor="email">Email</label>
                <input value={context.userCred.email} onChange={context.handleLoginChange} id="email" name="email"/>

                <label htmlFor="password">Password</label>
                <input value={context.userCred.password} onChange={context.handleLoginChange} id="password" name="password" />

                <input type="submit" value="login" className="btn-form" />
            </form >
        </div>
    );
};

export default Login;