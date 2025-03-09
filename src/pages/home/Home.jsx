import { useAuth } from "../../context/AuthContext";
import Transactions from "../transactions/Transactions";
import Drawer from "../../components/Drawer/Drawer";
import { useState } from "react";
import Categories from "../categories/Categories";
import MonthlyBudget from "../monthlyBudget/MonthlyBudget";
import AnualBudget from "../anualBudget/AnualBudget";

export default function Home() {
  const { user } = useAuth();
  const [activeComponent, setActiveComponent] = useState("home");

  const components = {
    home: <h2>Welcome to the dashboard, {user?.email}!</h2>,
    transactions: <Transactions />,
    categories: <Categories />,
    settings: <h2>Settings Page</h2>,
    monthly: <MonthlyBudget />,
    anual: <AnualBudget />
  };

  return (
    <div style={{ display: "flex" }}>
      <Drawer onSelect={setActiveComponent} />
      <div>
      <div>
        <div >
          <div>
            {components[activeComponent] || <h2>Page Not Found</h2>}
          </div>
        </div>
      </div>
      </div>
      
    </div>
  );
}
