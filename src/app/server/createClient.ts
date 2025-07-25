// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABOndnXc_OAYZdsZR-QmNXUFBzOS1fO-w",
  authDomain: "thelineup-96277.firebaseapp.com",
  projectId: "thelineup-96277",
  storageBucket: "thelineup-96277.firebasestorage.app",
  messagingSenderId: "1022236175488",
  appId: "1:1022236175488:web:f9f16fb66f2a9d69518a65",
  measurementId: "G-4RR763BT0G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
console.log('analytics', analytics)