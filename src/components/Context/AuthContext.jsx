import React, { useContext, useEffect } from "react";
import { createContext, useState } from "react";
import { onAuthStateChanged,signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebase/firebase";

//METHOD 1 - storing the user in localstorage
// const user = localStorage.getItem("currentUser")!=='undefined' ? JSON.parse(localStorage.getItem("currentUser")) : null;
// export const authContext = createContext(user);

//METHOD 2 to getting current signed in user, without localstorage
export const authContext = createContext();

export default function AuthContext(props) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  //METHOD 2
  // useEffect(() => {
  //   console.log("Effect : ", currentUser);
  //   localStorage.setItem("currentUser", JSON.stringify(currentUser));
  // }, [currentUser]);

  useEffect(() => {
    //JUST CHANGE THIS TO ANY FUNCTION THAT GETS A USER FORM ANY API
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false); //only render children if not loading, this avoids a weird bug
    });
    return unsubscribe; //unsub from the listener
  }, []);

  return (
    <authContext.Provider value={[currentUser, setCurrentUser]}>
      {!loading && props.children}
    </authContext.Provider>
  );
}
