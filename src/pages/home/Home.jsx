
import Transactions from "../transactions/Transactions";
import Drawer from "../../components/Drawer/Drawer";
import { useState, useEffect } from "react";
import Categories from "../categories/Categories";
import MonthlyBudget from "../monthlyBudget/MonthlyBudget";
import AnualBudget from "../anualBudget/AnualBudget";
import Dashboard from "../Dashboard.jsx/Dashboard";
import Settings from "../settings/settings";

export default function Home() {
  const [activeComponent, setActiveComponent] = useState("dashboard");
  const [isDrawerOpen, setIsDrawerOpen] = useState(window.innerWidth >= 1000);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1000) {
        setIsDrawerOpen(false);
      } else {
        setIsDrawerOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const components = {
    dashboard: <Dashboard />,
    transactions: <Transactions />,
    categories: <Categories />,
    settings: <Settings />,
    monthly: <MonthlyBudget />,
    anual: <AnualBudget />
  };

  return (
    <div className="home">
      <Drawer onSelect={setActiveComponent} isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen}/>
          <div className={`main ${isDrawerOpen ? "expanded" : "collapsed"}`}>
            {components[activeComponent] || <h2>Page Not Found</h2>}
          </div> 
    </div>
  );
}
