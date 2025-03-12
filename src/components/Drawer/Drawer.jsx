import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import * as Icons from "../../assets/Icons";
import { FaHome, FaExchangeAlt, FaCog } from "react-icons/fa";
import "./Drawer.css";

export default function Drawer({ onSelect, isOpen, setIsOpen }) {
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
          {isOpen ? <h3>Control Panel</h3> : <Icons.AiOutlineControl className="icon-nohover"/>}
          
        </div>
        <div className="container ">
          {isOpen ? <div className="user-box circle">
              <Icons.FaUserCircle  className="user-img"/>
            <div className="user-name ">
              <strong>User Name</strong>
              <p>{user.email}</p>
            </div>
          </div>
           : <div className="user-img circle closed"><Icons.FaUserCircle className="icon-big" /></div> }
          <div className={`search-btn ${isOpen ? "circle" : "circle closed"}`} onClick={handleLogout}>
            <Icons.MdLogout className="icon-big"/>
          </div>
          <div className="darkMode-btn circle" >
          </div>
          <div className={`search-btn ${isOpen ? "circle" : "circle closed"}`}>
            <Icons.IoSearch className="icon"/>
          </div>
        </div>
      </div>
      <div className="navigation">
        <div className="navigation-title">
          {isOpen ? <h3>Navigation</h3> : <Icons.PiNavigationArrowBold className="icon-nohover"/>} 
        </div>
        <button onClick={() => onSelect("dashboard")}>
          <FaHome className="icon" />
          {isOpen && <h4>Dashboard</h4>}
        </button>
        <button onClick={() => onSelect("categories")}>
          <Icons.BiSolidCategory className="icon" />
          {isOpen && <h4>Categories</h4>}
        </button>
        <button onClick={() => onSelect("transactions")}>
          <FaExchangeAlt className="icon" />
          {isOpen && <h4>Transactions</h4>}
        </button>
        <button onClick={() => onSelect("settings")}>
          <FaCog className="icon" />
          {isOpen && <h4>Settings</h4>}
        </button>
        <button onClick={() => onSelect("monthly")}>
          <Icons.IoCalendarNumberSharp className="icon" />
          {isOpen && <h4>Monthly Budget</h4>}
        </button>
        <button onClick={() => onSelect("anual")}>
          <Icons.FaCalendarAlt className="icon" />
          {isOpen && <h4>Anual budget</h4>}
        </button>
      </div>
      
        {isOpen ?  <div onClick={() => setIsOpen(!isOpen)}>
          <div className="collapse-btn">
            <Icons.TbLayoutSidebarLeftCollapseFilled  className="icon-sideBar"/>
             Collapse Sidebar
          </div>
        </div>: 
        <div className="circle" onClick={() => setIsOpen(true)}><Icons.TbLayoutSidebarLeftExpandFilled className="icon-big" /></div>}

    </div>

  );
}
