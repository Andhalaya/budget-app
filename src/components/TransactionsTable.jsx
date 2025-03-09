import * as Icons from "../assets/Icons"
import "../pages/transactions/Transactions.css"

export default function TransactionsTable({ transactions, onEdit, onDelete }) {
    return (
      <table cellPadding="10" cellSpacing="0" style={{ width: "100%", textAlign: "center" }}>
        <thead>
          <tr>
            <th>Description</th>
            <th>Category</th>
            <th>Subcategory</th>
            <th>Amount ($)</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <tr className="t-row" key={transaction.id}>
                <td>{transaction.description}</td>
                <td>{transaction.category}</td>
                <td>{transaction.subcategory}</td>
                <td>${transaction.amount}</td>
                <td style={{ color: transaction.type === "income" ? "green" : "red" }}>
                  {transaction.type}
                </td>
                <td className="actions">
                  <Icons.HiPencil className="icon" onClick={() => onEdit(transaction)}/>
                  <Icons.MdDelete className="icon" onClick={() => onDelete(transaction.id)} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No transactions available</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }
  