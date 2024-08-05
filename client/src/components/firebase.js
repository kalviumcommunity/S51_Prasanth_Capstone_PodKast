// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAvW_bLrsn_fFqv-TcuT_Lh4eu8Bk42hNI',
  authDomain: 'podkast-21.firebaseapp.com',
  databaseURL: 'https://podkast-21-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'podkast-21',
  storageBucket: 'podkast-21.appspot.com',
  messagingSenderId: '870058710499',
  appId: '1:870058710499:web:cb801352ee5711bf557cd6',
  measurementId: 'G-TT3FQELFHT'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize App Check
const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('6LcUosYpAAAAAN6UcGXb9JXmDrTnlWDOkbePNf2P'),
  isTokenAutoRefreshEnabled: true,
});

// For development, use the following to bypass App Check enforcement
// Remove this in production
self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;

// Initialize Firebase storage
export const storage = getStorage(app);

// Initialize Firebase auth
export const auth = getAuth(app);

// Export the required functions
export { createUserWithEmailAndPassword, signInWithEmailAndPassword };
