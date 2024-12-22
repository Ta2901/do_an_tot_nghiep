// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'; 
import { getStorage } from 'firebase/storage';
// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDec1uQN4U0cgDkKaAGwVZ9Wf9O-5cYCkU",
  authDomain: "fir-ae529.firebaseapp.com",
  projectId: "fir-ae529",
  storageBucket: "fir-ae529.firebasestorage.app",
  messagingSenderId: "499815109874",
  appId: "1:499815109874:web:53d9c65eebba9a082d2c6b",
  measurementId: "G-S5ZR9V0QQM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); 
const storage = getStorage(app);
// Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// Export auth and sign-in methods
export { auth, signInWithEmailAndPassword, signInWithPopup, googleProvider,db,storage };