import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAMfCMHBF1enwjxFPq6LIdOKAyadGbb_p0",
  authDomain: "todo-5fd3e.firebaseapp.com",
  projectId: "todo-5fd3e",
  storageBucket: "todo-5fd3e.firebasestorage.app",
  messagingSenderId: "340603604229",
  appId: "1:340603604229:web:6cb35b09c31d2752f67b6c",
  measurementId: "G-S1X913YE6Q",
};

const app = initializeApp(firebaseConfig);

// Auth & Firestore references
export const auth = getAuth(app);
export const db = getFirestore(app);
