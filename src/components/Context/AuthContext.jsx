import React from "react";
import { createContext, useState } from "react";

const authContext = createContext(null);

export default function AuthContext(props) {
  const [currentUser, setCurrentUser] = useState(null);
  return (
    <authContext.Provider value={[currentUser, setCurrentUser]}>
      {props.children}
    </authContext.Provider>
  );
}
