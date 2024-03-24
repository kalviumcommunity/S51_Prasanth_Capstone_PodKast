// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEwno7ppquFbcmke7-92t5oknBCxYoHX8",
  authDomain: "podkast-efabc.firebaseapp.com",
  projectId: "podkast-efabc",
  storageBucket: "podkast-efabc.appspot.com",
  messagingSenderId: "287287085019",
  appId: "1:287287085019:web:de3d3953ca20a3505f09fe",
  measurementId: "G-H7JGWL0PHW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);