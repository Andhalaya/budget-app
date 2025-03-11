import { useEffect, useState } from "react";
import { useTransactions } from "../../hooks/useTransactions";
import { useCategories } from "../../hooks/useCategories";
import './MonthlyBudget.css'

export default function MonthlyBudget() {
    const { transactions } = useTransactions(); // Fetch transactions
    const [monthlyTransactions, setMonthlyTransactions] = useState([]);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [categoryExpenses, setCategoryExpenses] = useState({});
    const [categoryIncomes, setCategoryIncomes] = useState({});
    const [savings, setSavings] = useState(0);

    const currentMonthName = new Date().toLocaleString("default", { month: "long" }).toUpperCase();


    // Filter transactions for the current month
    useEffect(() => {
        if (!transactions.length) return;

        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        // Filter transactions for the current month
        const filteredTransactions = transactions.filter((t) => {
            if (!t.timestamp || !t.timestamp.seconds) return false;
            const transactionDate = new Date(t.timestamp.seconds * 1000);
            return (
                transactionDate.getMonth() === currentMonth &&
                transactionDate.getFullYear() === currentYear
            );
        });

        setMonthlyTransactions(filteredTransactions);

        let income = 0;
        let expenses = 0;
        const expenseMap = {};
        const incomeMap = {};

        filteredTransactions.forEach((t) => {
            if (t.type === "income") {
                income += t.amount;

                if (!incomeMap[t.category]) {
                    incomeMap[t.category] = 0;
                }
                incomeMap[t.category] += t.amount;
            } else {
                expenses += t.amount;

                if (!expenseMap[t.category]) {
                    expenseMap[t.category] = {};
                }
                if (!expenseMap[t.category][t.subcategory]) {
                    expenseMap[t.category][t.subcategory] = 0;
                }
                expenseMap[t.category][t.subcategory] += t.amount;
            }
        });

        setTotalIncome(income);
        setTotalExpenses(expenses);
        setSavings(income - expenses);
        setCategoryExpenses(expenseMap);
        setCategoryIncomes(incomeMap);
    }, [transactions]);


    return (
        <div className="month-budget">
            <div className="title">
                <h1>Monthly Budget</h1>
                <h2>{currentMonthName}</h2>
            </div>
            <div className="summary">
                <div className="income">
                    <div className="flex">
                        <h3>Total Income</h3>
                        <p>${totalIncome.toFixed(2)}</p>
                    </div>
                    <div className="box">
                        {Object.keys(categoryIncomes).map((category) => (
                            <div className="list-element flex" key={category}>
                                {category}
                                <div>${categoryIncomes[category].toFixed(2)}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="expenses">
                    <div className="flex">
                        <h3>Total Expenses</h3>
                        <p>${totalExpenses.toFixed(2)}</p>
                    </div>
                    <div className="box">
                        {Object.keys(categoryExpenses).map((category) => {
                            const categoryTotal = Object.values(categoryExpenses[category]).reduce((sum, subAmount) => sum + subAmount, 0);
                            return (
                                <div className="list-element flex" key={category}>
                                    {category}
                                    <div>- ${categoryTotal.toFixed(2)}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="savings">
                    <h3>Savings</h3>
                    <div className="box">
                        <p>${savings.toFixed(2)}</p>
                    </div>
                </div>
            </div>
            <div className="month-boxes flex-gap">
                {/* Expenses by Category */}
                {Object.keys(categoryExpenses).map((category) => {
                    const categoryTotal = Object.values(categoryExpenses[category]).reduce((sum, subAmount) => sum + subAmount, 0);
                    return (
                        <div key={category}>
                            <div className="flex">
                                <h3>{category}</h3>
                                <div><strong>${categoryTotal.toFixed(2)}</strong></div>
                            </div>
                            <div className="box">
                                {Object.keys(categoryExpenses[category]).map((subcategory) => (
                                    <div key={subcategory}>
                                        <div className="subcategory-title flex">
                                            {subcategory}
                                            <div>
                                                - ${categoryExpenses[category][subcategory].toFixed(2)}
                                            </div>
                                        </div>
                                        <div className="m-transactions">
                                            {monthlyTransactions
                                            .filter(t => t.category === category && t.subcategory === subcategory)
                                            .map((t, index) => (
                                                <div key={index} className="list-element flex">
                                                    {t.description}
                                                    <div>{t.amount.toFixed(2)}</div>
                                                </div>
                                            ))
                                            }
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    )
                }
                )}
            </div>
        </div>
    );
}


