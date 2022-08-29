import React, { useContext, useEffect } from "react";
import { createContext, useState } from "react";

const user=JSON.parse(localStorage.getItem("currentUser")) || null
export const authContext = createContext(user);

export default function AuthContext(props) {
  const [currentUser, setCurrentUser] = useState(user);

  useEffect(() => {
    console.log("Effect : ", currentUser);
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <authContext.Provider value={[currentUser, setCurrentUser]}>
      {props.children}
    </authContext.Provider>
  );
}
