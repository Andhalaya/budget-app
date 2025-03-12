import { useEffect, useState } from "react";
import { useTransactions } from "../../hooks/useTransactions";
import './MonthlyBudget.css'

export default function MonthlyBudget() {
    const { transactions } = useTransactions();
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
        <div className="monthly-budget">
            <div className="title">
                <h1>{currentMonthName}</h1>
                <h2>Monthly Budget</h2>
            </div>
            <div className="summary">
                <div className="s-list">
                    <h2>Summary</h2>
                    <div className='summary-container'>
                        <div className="summary-box">
                            <div className='s-list-title'>
                                <h3>Income</h3>
                                <h3>${totalIncome.toFixed(2)}</h3>
                            </div>
                            {Object.keys(categoryIncomes).map((category) => (
                                <div className="list-element" key={category}>
                                    {category}
                                    <div>{categoryIncomes[category].toFixed(2)}$</div>
                                </div>
                            ))}
                        </div>
                        <div className="summary-box">
                            <div className="s-list-title">
                                <h3>Expenses</h3>
                                <h3>${totalExpenses.toFixed(2)}</h3>
                            </div>
                            {Object.keys(categoryExpenses).map((category) => {
                                const categoryTotal = Object.values(categoryExpenses[category]).reduce((sum, subAmount) => sum + subAmount, 0);
                                return (
                                    <div className="list-element" key={category}>
                                        {category}
                                        <div>{categoryTotal.toFixed(2)}$</div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="summary-box">
                            <h3>Savings</h3>
                            <div className='list-element'>
                                <div>{savings.toFixed(2)}$</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="chart"></div>
            </div>
            <div className="expenses-boxes">
                {/* Expenses by Category */}
                {Object.keys(categoryExpenses).map((category) => {
                    const categoryTotal = Object.values(categoryExpenses[category]).reduce((sum, subAmount) => sum + subAmount, 0);
                    return (
                        <div key={category} className="e-box">
                            <h3>{category}</h3>
                            {Object.keys(categoryExpenses[category]).map((subcategory) => (
                                <div key={subcategory} className="list">
                                    <div className="cat-box" >
                                        <div className="cat-box-title">{subcategory}</div>
                                       {categoryExpenses[category][subcategory].toFixed(2)} $
                                    </div>
                                    {monthlyTransactions
                                        .filter(t => t.category === category && t.subcategory === subcategory)
                                        .map((t, index) => (
                                            <div key={index} className="list-element">
                                                <p>{t.description}</p>
                                                <p>{t.amount.toFixed(2)}$</p>
                                            </div>
                                        ))
                                    }
                                </div>
                            ))}
                            <div className="total">
                                <h3>Total</h3>
                                <h3>${categoryTotal.toFixed(2)}</h3>
                            </div>
                        </div>
                    )
                }
                )}
            </div>
        </div>
    );
}


