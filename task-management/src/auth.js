import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

//* registering new user with email and password
export const registerUser = async (email, password) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

//* login existing user
export const loginUser = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

//*logout user
export const logoutUser = async () => {
  return await signOut(auth);
};

//* LISTEN to auth changes(login / logout in real time)
export const subscribeToAuthChanges = (callback) => {
  return onAuthStateChanged(auth, callback);
  // callback receives `user` if logged in, null if logged out
};
