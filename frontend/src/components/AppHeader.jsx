import React from "react";

const AppHeader = () => (
  <header className="header">
    <div className="logo">
      <img src="/logo.png" alt="GoDesign" />
    </div>
    <div className="search-bar">
      <input type="text" placeholder="Search..." />
    </div>
    <div className="wallet">
      <div className="wallet-balance-box">
        <span className="wallet-icon">💰</span>
        <span className="wallet-balance-amount">₹0</span>
      </div>
      <button className="btn-recharge">Recharge</button>
      <div className="avatar"></div>
    </div>
  </header>
);

export default AppHeader;