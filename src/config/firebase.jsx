import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, query, where } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBSKcA-H-H2FTIcyWGjXr1T2YqTSozBuT4",
  authDomain: "budgetapp-dbdad.firebaseapp.com",
  projectId: "budgetapp-dbdad",
  storageBucket: "budgetapp-dbdad.firebasestorage.app",
  messagingSenderId: "260683084022",
  appId: "1:260683084022:web:6e12560e3e5dd0ad64fcd7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, collection, addDoc, getDocs, deleteDoc, doc, query, where, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut };
