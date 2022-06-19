import React, { useContext } from 'react';
import { MyContext } from '../../context/MyProvider.js'
import './Profile.css'

const Profile = () => {
    const context = useContext(MyContext);

    return (
        <div className='profile-container'>
            <h1>Profile</h1>
            { context.loggedIn ? 
            <div className='profile-info'>
                <p>Hello {context.userCred.name}</p> 
                <p>This is your account information</p>
                <p>City: {context.userCred.city}</p>
                <p>Age: {context.userCred.age}</p>
            </div>
            : 
            <></> }
        </div>
    );
};

export default Profile;
