// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvW_bLrsn_fFqv-TcuT_Lh4eu8Bk42hNI",
  authDomain: "podkast-21.firebaseapp.com",
  databaseURL: "https://podkast-21-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "podkast-21",
  storageBucket: "podkast-21.appspot.com",
  messagingSenderId: "870058710499",
  appId: "1:870058710499:web:cb801352ee5711bf557cd6",
  measurementId: "G-TT3FQELFHT"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

const storage = getStorage();
export { firebase, storage };