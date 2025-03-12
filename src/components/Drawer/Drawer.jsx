import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import * as Icons from "../../assets/Icons";
import { FaHome, FaExchangeAlt, FaCog } from "react-icons/fa";
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
      <div className="logo">
        Tracker
      </div>
      <div className="navigation control-panel">
        <div className="navigation-title">
          <h3>Control Panel</h3>
        </div>
        <div className="container ">
          {isOpen ? <div className="user-box circle">
            <div className="user-img"></div>
            <div className="user-name ">
              <strong>User Name</strong>
              <p>{user.email}</p>
            </div>
          </div> : <div className="circle"></div>}
          <div className="logout-btn circle"></div>
          <div className="darkMode-btn circle" ></div>
          <div className="search-btn circle"></div>
        </div>
      </div>
      <div className="navigation">
        <div className="navigation-title">
          <h3>Navigation</h3>
        </div>
        <button onClick={() => onSelect("dashboard")}>
          <FaHome className="icon" />
          {isOpen && <span>Dashboard</span>}
        </button>
        <button onClick={() => onSelect("categories")}>
          <Icons.BiSolidCategory className="icon" />
          {isOpen && <span>Categories</span>}
        </button>
        <button onClick={() => onSelect("transactions")}>
          <FaExchangeAlt className="icon" />
          {isOpen && <span>Transactions</span>}
        </button>
        <button onClick={() => onSelect("settings")}>
          <FaCog className="icon" />
          {isOpen && <span>Settings</span>}
        </button>
        <button onClick={() => onSelect("monthly")}>
          <Icons.IoCalendarNumberSharp className="icon" />
          {isOpen && <span>Monthly Budget</span>}
        </button>
        <button onClick={() => onSelect("anual")}>
          <Icons.FaCalendarAlt className="icon" />
          {isOpen && <span>Anual budget</span>}
        </button>
        {isOpen ?
          <button onClick={handleLogout}>
            <Icons.MdLogout className="icon" /> Logout
          </button>
          : null}

      </div>
      <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "X" : <Icons.GiHamburgerMenu className="icon" />}
      </button>
    </div>

  );
}
