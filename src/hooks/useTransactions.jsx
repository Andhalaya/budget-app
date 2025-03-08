import { useState, useEffect } from "react";
import { db } from "../config/firebase";
import {
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where 
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

export function useTransactions() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      fetchTransactions();
    }
  }, [user]);

  const fetchTransactions = async () => {
    if (!user) return;
    setLoading(true);
    setError(null);

    try {
      console.log("Fetching transactions for user:", user.uid);

      const transactionsRef = collection(db, "transactions");
      const q = query(transactionsRef, where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      const transactionsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("Fetched transactions:", transactionsData);
      setTransactions(transactionsData);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  const addOrUpdateTransaction = async (transaction, editId = null) => {
    if (!user) {
      console.error("No user is logged in! Cannot add transaction.");
      return;
    }

    try {
 
      const transactionData = {
        ...transaction,
        userId: user.uid, 
        timestamp: new Date(),
      };

      if (editId) {
        const transactionRef = doc(db, "transactions", editId);
        await updateDoc(transactionRef, transactionData);
        console.log("Transaction updated:", transactionData);
      } else {
        await addDoc(collection(db, "transactions"), transactionData);
        console.log("Transaction added:", transactionData);
      }

      fetchTransactions();
    } catch (error) {
      setError(error.message);
      console.error("Error adding/updating transaction:", error);
    }
  };

  const deleteTransaction = async (id) => {
    if (!user) return;

    try {
      await deleteDoc(doc(db, "transactions", id));
      console.log("Transaction deleted:", id);
      fetchTransactions(); 
    } catch (error) {
      setError(error.message);
      console.error("Error deleting transaction:", error);
    }
  };

  return { transactions, loading, error, addOrUpdateTransaction, deleteTransaction };
}
