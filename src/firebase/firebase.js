// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5t-hR_4oZc0Z1sWHgzrPqeh2hc-avewM",
  authDomain: "react-crud-6c7c7.firebaseapp.com",
  projectId: "react-crud-6c7c7",
  storageBucket: "react-crud-6c7c7.appspot.com",
  messagingSenderId: "289772837459",
  appId: "1:289772837459:web:bcb25756872851dc6dc4a6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth()
export const db=getFirestore(app)