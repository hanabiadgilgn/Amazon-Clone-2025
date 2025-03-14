// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import { getAuth } from 'firebase/auth'
import  "firebase/compat/firestore";
import "firebase/compat/auth"

const API_KEY = import.meta.env.VITE_APP_API_KEY;
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "clone-2025-7dcb9.firebaseapp.com",
  projectId: "clone-2025-7dcb9",
  storageBucket: "clone-2025-7dcb9.firebasestorage.app",
  messagingSenderId: "935637646882",
  appId: "1:935637646882:web:652911d5124f0f9f93d47b",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = app.firestore()
