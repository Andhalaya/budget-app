import { useState, useEffect } from "react";
import { db } from "../../config/firebase"; 
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
import { useAuth } from "../../context/AuthContext";

export default function Transactions() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [editId, setEditId] = useState(null); 

  useEffect(() => {
    if (user) {
      fetchTransactions();
    }
  }, [user]);


  const fetchTransactions = async () => {
    if (!user) return;
  
    console.log("Fetching transactions for user:", user.uid); // ✅ Debugging
  
    try {
      const q = query(collection(db, "transactions"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);
  
      if (querySnapshot.empty) {
        console.log("No transactions found!"); // ❌ If Firestore returns empty
      }
  
      const transactionsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      console.log("Fetched transactions:", transactionsData); // ✅ See what is returned
      setTransactions(transactionsData);
    } catch (error) {
      console.error("Error fetching transactions:", error.message);
    }
  };
  

  const handleAddOrUpdateTransaction = async (e) => {
    e.preventDefault();
    if (!description || !amount) return;
  
    const transactionData = {
      userId: user?.uid,
      description,
      amount: parseFloat(amount),
      type,
      timestamp: new Date(),
    };
  
    console.log("Transaction to add/update:", transactionData); // ✅ Check transaction details
  
    try {
      if (editId) {
        const transactionRef = doc(db, "transactions", editId);
        await updateDoc(transactionRef, transactionData);
        setEditId(null);
      } else {
        await addDoc(collection(db, "transactions"), transactionData);
      }
      console.log("Transaction added successfully!"); // ✅ Check if Firestore receives it
      fetchTransactions();
    } catch (error) {
      console.error("Error adding transaction:", error.message); // ❌ See errors if any
    }
  
    setDescription("");
    setAmount("");
    setType("income");
  };
  

  const handleDeleteTransaction = async (id) => {
    await deleteDoc(doc(db, "transactions", id));
    fetchTransactions();
  };


  const handleEditTransaction = (transaction) => {
    setDescription(transaction.description);
    setAmount(transaction.amount);
    setType(transaction.type);
    setEditId(transaction.id);
  };

  return (
    <div>
      <h2>Transactions</h2>

      {/* Form to add/update transactions */}
      <form onSubmit={handleAddOrUpdateTransaction}>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <button type="submit">{editId ? "Update Transaction" : "Add Transaction"}</button>
      </form>

      {/* Display transactions */}
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            {transaction.description} - ${transaction.amount} ({transaction.type})
            <button onClick={() => handleEditTransaction(transaction)}>Edit</button>
            <button onClick={() => handleDeleteTransaction(transaction.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
