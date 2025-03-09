import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import * as Icons from "../../assets/Icons"; 
import { FaHome, FaExchangeAlt, FaCog } from "react-icons/fa"; // Import icons
import "./Drawer.css";

export default function Drawer({ onSelect }) {
  const [isOpen, setIsOpen] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className={`drawer ${isOpen ? "open" : "closed"}`}>
      <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "X" : <Icons.GiHamburgerMenu />}
      </button>
      <button onClick={() => onSelect("home")}>
        <FaHome />
        {isOpen && <span>Home</span>}
      </button>
        <button onClick={() => onSelect("categories")}>
            <Icons.BiSolidCategory />
            {isOpen && <span>Categories</span>}
        </button>
      <button onClick={() => onSelect("transactions")}>
        <FaExchangeAlt />
        {isOpen && <span>Transactions</span>}
      </button>
      <button onClick={() => onSelect("settings")}>
        <FaCog />
        {isOpen && <span>Settings</span>}
      </button>
      <button onClick={() => onSelect("monthly")}>
        <Icons.IoCalendarNumberSharp />
        {isOpen && <span>Monthly Budget</span>}
      </button>
      <button onClick={() => onSelect("anual")}>
        <Icons.FaCalendarAlt />
        {isOpen && <span>Anual budget</span>}
      </button>
      {isOpen ? 
        <button onClick={handleLogout}>
        <Icons.MdLogout /> Logout
        </button> 
        : null}
      
    </div>
  );
}
