import google from "../../assets/images/google.png";
import facebook from "../../assets/images/facebook.png";
import github from "../../assets/images/github.png";
import twitter from "../../assets/images/twitter.png";

import React from "react";

export default function Socials() {
  return (
    <>
      {/* Sign up with socials */}
      <div className="flex justify-between">
        <button className="w-14 h-14 bg-slate-100	 rounded-lg">
          <img src={google} className="p-2" />
        </button>
        <button className="w-14 h-14 bg-slate-100 rounded-lg">
          <img src={facebook} className="p-2" />
        </button>
        <button className="w-14 h-14 bg-slate-100 rounded-lg">
          <img src={github} className="p-2" />
        </button>
        <button className="w-14 h-14 bg-slate-100 rounded-lg">
          <img src={twitter} className="p-2" />
        </button>
      </div>
    </>
  );
}
