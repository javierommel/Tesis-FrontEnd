// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAza8gOgEjPq0_X4FIg-CVnKKs10dLj8EE",
  authDomain: "fir-react-auth-2d611.firebaseapp.com",
  projectId: "fir-react-auth-2d611",
  storageBucket: "fir-react-auth-2d611.appspot.com",
  messagingSenderId: "297942856314",
  appId: "1:297942856314:web:08814231bec51904eb41c3",
  measurementId: "G-MB0B39ELBP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth= getAuth(app);
const provider=new GoogleAuthProvider();
export {auth, provider}; 