import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { authContext } from "../Context/AuthContext";
import Socials from "./Socials";
import UI from "./UI";
import InputError from "./InputError";

export default function Signin() {
  const [, setCurrentUser] = useContext(authContext);
  const [loginError,setLoginError]=useState()

  let navigate = useNavigate();
  const formik = useFormik({
    //inital values
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Must enter an email")
        .email("Invalid email format"),
      password: Yup.string()
        .required("Must enter a password")
        .min(8, "At least 8 characters"),
    }),
    //submit function that takes form values as args
    onSubmit: (values) => {
      //JUST REPLACE THIS WITH ANY SIGNIN FUNCTION FROM ANY API
      signInWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          // Signed in
          setCurrentUser(userCredential.user);
          navigate("/");
        })
        .catch((error) => {
          setLoginError(error.code.replace('auth/','').replaceAll('-',' ').toUpperCase())
        });
    },
  });
  return (
    <>
      <UI message={"Login to Your Account"}>
        <form onSubmit={formik.handleSubmit} className="space-y-4 md:space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="johndoe@mail.com"
              required=""
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <InputError
              fieldError={formik.errors?.email}
              fieldTouched={formik.touched?.email}
            />
            {/* Error after login */}
            <InputError fieldError={loginError} fieldTouched={true} />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required=""
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <InputError
              fieldError={formik.errors?.password}
              fieldTouched={formik.touched?.password}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  aria-describedby="remember"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  required=""
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="remember"
                  className="text-gray-500 dark:text-gray-300"
                >
                  Remember me
                </label>
              </div>
            </div>
            <a
              href="#"
              className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Sign in
          </button>
        </form>
        {/* Sign up with socials */}
        <Socials />
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          Don't have an account ?{" "}
          <Link
            to={"/signup"}
            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
          >
            Sign Up
          </Link>
        </p>
      </UI>
    </>
  );
}
