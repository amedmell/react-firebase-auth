// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_FIREBASE_API_KEY,
  authDomain: "react-crud-6c7c7.firebaseapp.com",
  projectId: "react-crud-6c7c7",
  storageBucket: "react-crud-6c7c7.appspot.com",
  messagingSenderId: "289772837459",
  appId: "1:289772837459:web:bcb25756872851dc6dc4a6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);