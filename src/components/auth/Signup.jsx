import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { authContext } from "../Context/AuthContext";
import Socials from "./Socials";
import UI from "./UI";
import InputError from "./InputError";

export default function Signup() {
  const [, setCurrentUser] = useContext(authContext);
  const [signUpError, setSignUpError] = useState();

  let navigate = useNavigate(); //navigatin to links

  const formik = useFormik({
    //inital values
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmpassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required("Must enter username")
        .matches("[A-Za-z]", "Must only contain letters")
        .max(15, "too long, use an abreviation please"),
      email: Yup.string()
        .required("Must enter an email")
        .email("Invalid email format"),
      password: Yup.string()
        .required("Must enter a password")
        .min(8, "At least 8 characters"),
      confirmpassword: Yup.string()
        .required("Cannot be empty")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
    }),
    //submit function that takes form values as args
    onSubmit: (values) => {
      //JUST REPLACE THIS WITH ANY SIGNUP FUNCTION FROM ANY API
      createUserWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          setCurrentUser(user); //setting the user context
          console.log("Account Successfully Created : ", user);
          navigate("/");
        })
        .catch((error) => {
          setSignUpError(
            error.code.replace("auth/", "").replaceAll("-", " ").toUpperCase()
          );
        });
    },
  });
  return (
    <>
      <UI message={"Create Your Account"}>
        <form onSubmit={formik.handleSubmit} className="space-y-4 md:space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="johndoe"
              required=""
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {/* Validation error */}
            <InputError
              fieldError={formik.errors?.username}
              fieldTouched={formik.touched?.username}
            />
          </div>
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
              placeholder="name@company.com"
              required=""
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <InputError
              fieldError={formik.errors?.email}
              fieldTouched={formik.touched?.email}
            />
            {/* Account creation erro */}
            <InputError fieldError={signUpError} fieldTouched={true} />
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
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmpassword"
              id="confirmpassword"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required=""
              value={formik.values.confirmpassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <InputError
              fieldError={formik.errors?.confirmpassword}
              fieldTouched={formik.touched?.confirmpassword}
            />
          </div>

          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Create Account
          </button>
        </form>
        {/* Sign up with socials */}
        <Socials />

        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          Already have an account ?{" "}
          <Link
            to={"/signin"}
            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
          >
            Sign In
          </Link>
        </p>
      </UI>
    </>
  );
}
