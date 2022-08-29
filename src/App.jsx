import React, { useContext } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import { authContext } from "./components/Context/AuthContext";

export default function App() {
  const [currentUser] = useContext(authContext); //current user to set route guards
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </>
  );
}
