import { db } from "./firebase";
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,

} from "firebase/firestore";

// Reference to the "tasks" collection
const tasksCollection = collection(db, "tasks");

// ADD a new todo (with user ID attached)
export const addTodo = async (userId, text) => {
  return await addDoc(tasksCollection, {
    uid: userId, // Which user owns the todo
    text: text, // Todo text
    completed: false, // Default: not done
    createdAt: Date.now(),
  });
};

// GET todos in real-time for a specific user
export const subscribeToTodos = (userId, callback) => {
  // query: only return todos belonging to logged in user
  const q = query(tasksCollection, where("uid", "==", userId));

  // onSnapshot: runs whenever data changes (add/update/delete)
  return onSnapshot(q, (snapshot) => {
    const todos = snapshot.docs.map((doc) => ({
      id: doc.id, // Firestore doc id
      ...doc.data(), // Spread rest of fields
    }));
    callback(todos);
  });
};

// TOGGLE (update) todo
export const toggleTodo = async (id, currentStatus) => {
  const docRef = doc(db, "tasks", id);
  return await updateDoc(docRef, { completed: !currentStatus });
};



// UPDATE todo fields (e.g., text)
export const updateTodo = async (id, data) => {
  const docRef = doc(db, "tasks", id);
  return await updateDoc(docRef, data);
};

// DELETE todo
export const deleteTodoById = async (id) => {
  const docRef = doc(db, "tasks", id);
  return await deleteDoc(docRef);
};
