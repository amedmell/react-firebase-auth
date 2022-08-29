import React, { useContext } from "react";
import { authContext } from "./Context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [currentUser, setCurrentUser] = useContext(authContext);
  let navigate = useNavigate();

  const SignOut = () => {
    signOut(auth)
      .then(() => {
        setCurrentUser(null);
        navigate("/signin");
      })
      .catch((error) => {
        console.log("Error Signing out : ", error);
      });
  };

  return (
    <>
      Welcome {currentUser?.email}
      <button
        onClick={SignOut}
        className="text-white rounded-lg bg-blue-600 w-24 h-12"
      >
        Log Out
      </button>
    </>
  );
}
