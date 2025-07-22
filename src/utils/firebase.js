import { getAuth } from "firebase/auth";


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBCUr0dBb9fR9TypIGANe7-3wlleBqzPJ8",
  authDomain: "watcher-64b33.firebaseapp.com",
  projectId: "watcher-64b33",
  storageBucket: "watcher-64b33.firebasestorage.app",
  messagingSenderId: "44615908926",
  appId: "1:44615908926:web:e0e747184b2d3cca89db6f",
  measurementId: "G-69H30EYV5N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app);

export const auth = getAuth();