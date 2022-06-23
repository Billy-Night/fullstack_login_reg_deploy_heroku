import React, { useState } from "react";

export const MyContext = React.createContext();

const MyProvider = (props) => {

    const user = {
        email: "",
        password: "",
        name: "",
        city: "",
        age: "",
        token: "",
    };

    let [userCred, setUserCred] = useState(user);

    let [loggedIn, setLoggedIn] = useState(false);


    const handleLoginChange = (event) => {
        //const name = event.target.name
        //const value = event.target.value
        const { name, value } = event.target;

        //computed property name syntax to update the state key corresponding to the given input name:
        setUserCred({
            ...userCred,
            [name]: value,
        });
    };

//The most important part above is from the ES6 syntax [name]:value >>>> A name attribute has to be added to inputs and it means that it's setting a dynamic name property key, which will equal to the value of our current input state.

    const handleFormSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <MyContext.Provider 
            value={{
                userCred: userCred,
                user: user,
                setUserCred: setUserCred,
                handleLoginChange: handleLoginChange,
                handleFormSubmit: handleFormSubmit,
                setLoggedIn: setLoggedIn,
                loggedIn: loggedIn,
            }} >
                {props.children }
        </MyContext.Provider >
    );
};

export default MyProvider;