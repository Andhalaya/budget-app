import { useState } from "react";
import { useTransactions } from "../../hooks/useTransactions";
import { useCategories } from "../../hooks/useCategories"; // Import categories hook
import { useAuth } from "../../context/AuthContext";
import TransactionsTable from "../../components/TransactionsTable";
import * as Icons from "../../assets/Icons"
import './Transactions.css'

export default function Transactions() {
  const { transactions, addOrUpdateTransaction, deleteTransaction } = useTransactions();
  const { categories } = useCategories(); // Fetch categories
  const { user } = useAuth();
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Handle Category Selection
  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    setSubcategory(""); // Reset subcategory when category changes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description || !amount || !user || !category || !subcategory) return;

    const transactionData = {
      description,
      category,
      subcategory,
      amount: parseFloat(amount),
      type,
      userId: user.uid,
      timestamp: new Date(),
    };

    await addOrUpdateTransaction(transactionData, editId);

    // Clear form after submission
    setDescription("");
    setAmount("");
    setCategory("");
    setSubcategory("");
    setType("income");
    setEditId(null);
    setShowForm(false);
  };

  const handleEditTransaction = (transaction) => {
    setDescription(transaction.description);
    setAmount(transaction.amount);
    setCategory(transaction.category);
    setSubcategory(transaction.subcategory);
    setType(transaction.type);
    setEditId(transaction.id);
    setShowForm(true);
  };

  return (
    <div className="transactions">
      <h1>Transactions</h1>

      {/* Close button */}
      <div
        onClick={() => {
          if (showForm) {
            setDescription("");
            setAmount("");
            setCategory("");
            setSubcategory("");
            setType("income");
            setEditId(null);
          }
          setShowForm(!showForm);
        }}
        style={{ marginBottom: "10px" }}
      >
      {showForm ? <button>CLOSE</button> : <div className="add-btn">+ Add new transaction</div>}
      </div>

      {/* Add/Edit form */}
      {showForm && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          {/* Category Dropdown */}
          <select value={category} onChange={handleCategoryChange} required>
            <option value="" disabled>Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>{cat.name}</option>
            ))}
          </select>

          {/* Subcategory Dropdown */}
          <select
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
            required
            disabled={!category}
          >
            <option value="" disabled>Select Subcategory</option>
            {categories
              .find((cat) => cat.name === category)?.subcategories.map((sub, index) => (
                <option key={index} value={sub}>{sub}</option>
              ))}
          </select>

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
          <button type="submit">{editId ? 
          "Update Transaction" 
          : "Add Transaction"}</button>
        </form>
      )}

      <TransactionsTable
        transactions={transactions}
        onEdit={handleEditTransaction}
        onDelete={deleteTransaction}
      />
    </div>
  );
}
 