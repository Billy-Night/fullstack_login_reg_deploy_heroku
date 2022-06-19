import React from "react";
import { Routes, Route } from "react-router-dom";
import MyProvider from "./context/MyProvider";

import NavBar from './components/NavBar/NavBar.jsx';
import Home from './components/Home_Page/Home.jsx';
import Login from './components/Login_Page/Login.jsx';

import Registration from "./components/Registration/Registration";
import Error from './components/Error_Page/Error.jsx';
import Profile from "./components/Profile_Page/Profile";

import './App.css';

function App() {

  return (
    <MyProvider>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/error" element={<Error />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </MyProvider>
  );
}

export default App;
