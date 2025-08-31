import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthDispatch } from "../store/AuthContext";
import { logout } from "../store/AuthContext";


const AppSidebar = () => {
  const dispatch = useAuthDispatch();
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    await logout(dispatch);
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      <nav>
        <NavLink to="/dashboard">Initiate a Project</NavLink>
        <div className="sidebar-divider"></div>
        <NavLink to="/transactions">Transaction History</NavLink>
        <div className="sidebar-divider"></div>
        <NavLink to="/wallet">Wallet</NavLink>
        <div className="sidebar-divider"></div>
        <NavLink to="/settings" className="settings-link">Settings</NavLink>
        <div className="sidebar-divider"></div>
        <a href="#" className="settings-link" onClick={handleLogout}>Log Out</a>
      </nav>
    </aside>
  );
};

export default AppSidebar;
