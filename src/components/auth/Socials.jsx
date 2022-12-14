import google from "../../assets/images/google.png";
import facebook from "../../assets/images/facebook.png";
import github from "../../assets/images/github.png";
import twitter from "../../assets/images/twitter.png";
import React, { useContext, useState } from "react";
import { authContext } from "../Context/AuthContext";
import {
  signInWithGoogle,
  signInWithFacebook,
  signInWithGithub,
  signInWithTwitter,
} from "./SocialsSignin";

export default function Socials() {
  const [, setCurrentUser] = useContext(authContext);

  const googleSignIn = () => {
    setCurrentUser(signInWithGoogle());
  };
  const facebookSignIn = () => {
    setCurrentUser(signInWithFacebook());
  };
  const githubSignIn = () => {
    setCurrentUser(signInWithGithub());
  };
  const twitterSignIn = () => {
    setCurrentUser(signInWithTwitter());
  };

  return (
    <>
      {/* Sign up with socials */}
      <div className="flex justify-between">
        <button
          onClick={googleSignIn}
          className="w-14 h-14 bg-slate-100	 rounded-lg"
        >
          <img src={google} className="p-2" />
        </button>
        <button
          onClick={facebookSignIn}
          className="w-14 h-14 bg-slate-100 rounded-lg"
        >
          <img src={facebook} className="p-2" />
        </button>
        <button
          onClick={githubSignIn}
          className="w-14 h-14 bg-slate-100 rounded-lg"
        >
          <img src={github} className="p-2" />
        </button>
        <button
          onClick={twitterSignIn}
          className="w-14 h-14 bg-slate-100 rounded-lg"
        >
          <img src={twitter} className="p-2" />
        </button>
      </div>
    </>
  );
}
