import React from "react";
import { NavLink } from "react-router-dom";

const AppSidebar = () => (
  <aside className="sidebar">
    <nav>
      <NavLink to="/dashboard">Dashboard</NavLink>
      <NavLink to="/wallet">Wallet</NavLink>
      <NavLink to="/account-settings">Account Settings</NavLink>
    </nav>
    <div className="sidebar-divider"></div>
    <a href="#" className="settings-link">Settings</a>
  </aside>
);

export default AppSidebar;