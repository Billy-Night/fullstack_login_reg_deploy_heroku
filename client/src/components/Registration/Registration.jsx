import React, { useContext } from 'react';
import { MyContext } from '../../context/MyProvider.js';
import { useNavigate } from 'react-router-dom';
import './Registration.css'


const Registration = () => {

    const context = useContext(MyContext);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        //send information to the backend
        fetch("http://localhost:5000/api/register", {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json",
            }),
            body: JSON.stringify({
                email: context.userCred.email,
                password: context.userCred.password,
                name: context.userCred.name,
                city: context.userCred.city,
                age: context.userCred.age
            }),
        })
        .then((response) => {
            // context.setUserCred(context.userCred)
            if (response.status === 201) {
                navigate("/login")
                context.setUserCred(context.user)
            } else {
                console.log("Error from the registration frontend");
                navigate("/error");
            }
        });
    };

    return (
        <div className='registration-container'>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email: </label>
                <input value={context.userCred.email} onChange={context.handleLoginChange} id="email" name="email" />

                <label htmlFor="password">Password: </label>
                <input value={context.userCred.password} onChange={context.handleLoginChange} id="password" name="password" />

                <label htmlFor="name">Name: </label>
                <input value={context.userCred.name} onChange={context.handleLoginChange} id="name" name="name" />

                <label htmlFor="city">City: </label>
                <input value={context.userCred.city} onChange={context.handleLoginChange} id="city" name="city"/>

                <label htmlFor="age">Age: </label>
                <input value={context.userCred.age} onChange={context.handleLoginChange} id="age" name="age"/>

                <input className="btn-form" type="submit" value="submit"/>
            </form >
        </div>
    )
}

export default Registration;