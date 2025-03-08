export default function TransactionsTable({ transactions, onEdit, onDelete }) {
    return (
      <table border="1" cellPadding="8" cellSpacing="0" style={{ width: "100%", textAlign: "center" }}>
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
              <tr key={transaction.id}>
                <td>{transaction.description}</td>
                <td>{transaction.category}</td>
                <td>{transaction.subcategory}</td>
                <td>${transaction.amount}</td>
                <td style={{ color: transaction.type === "income" ? "green" : "red" }}>
                  {transaction.type}
                </td>
                <td>
                  <button onClick={() => onEdit(transaction)}>Edit</button>
                  <button onClick={() => onDelete(transaction.id)} style={{ marginLeft: "5px" }}>
                    Delete
                  </button>
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
  