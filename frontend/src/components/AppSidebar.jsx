import React from "react";
import { NavLink } from "react-router-dom";

const AppSidebar = () => (
  <aside className="sidebar">
    <nav>
      <NavLink to="/dashboard" className="active">Initiate a Project</NavLink>
      <div className="sidebar-divider"></div>
      <NavLink to="/transactions">Transaction History</NavLink>
      <div className="sidebar-divider"></div>
      <NavLink to="/wallet">Wallet</NavLink>
      <div className="sidebar-divider"></div>
      <NavLink to="/settings" className="settings-link">Settings</NavLink>
    </nav>
  </aside>
);

export default AppSidebar;
