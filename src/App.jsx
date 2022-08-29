import React, { useContext } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import { authContext } from "./components/Context/AuthContext";

export default function App() {
  const [currentUser] = useContext(authContext); //current user to set route guards
  const RequiredAuthRedirect=({To,redirectTo})=>{
    return currentUser ? To : redirectTo
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<RequiredAuthRedirect To={<Home/>} redirectTo={<Signin/>} />} />
        <Route path="/signup" element={<RequiredAuthRedirect To={<Home/>} redirectTo={<Signup/>}  />}/>
        <Route path="/signin" element={<RequiredAuthRedirect To={<Home/>} redirectTo={<Signin/>}  />} />
      </Routes>
    </>
  );
}
