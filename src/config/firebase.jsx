import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, query, where } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyClfzXcDdoKFCs8Yoq5gWP_vmYPTpVEohc",
  authDomain: "budget-app-7f25f.firebaseapp.com",
  projectId: "budget-app-7f25f",
  storageBucket: "budget-app-7f25f.firebasestorage.app",
  messagingSenderId: "176734186971",
  appId: "1:176734186971:web:5c76713d7afed1ac928bfe"

};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, collection, addDoc, getDocs, deleteDoc, doc, query, where, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut };
