import React from "react";
import LogoImg1 from "src/assets/img/logo.png";
const AppHeader = () => (
  <header className="header d-flex justify-content-between align-items-center">
    <div className="logo">
      <img src={LogoImg1} alt="GoDesyn Logo" />
    </div>
    <div className="search-bar">
      <input type="text" placeholder="Search..." />
    </div>
    <div className="wallet d-flex align-items-center">
      <div className="wallet-balance-box d-flex align-items-center me-3">
        <svg
          width="23"
          height="16"
          viewBox="0 0 23 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="wallet-icon"
        >
          <rect
            x="1.2"
            y="1.2"
            width="20.6"
            height="13.6"
            rx="4"
            stroke="#485DFF"
            strokeWidth="2"
          />
          <circle cx="5" cy="8" r="1.2" fill="#485DFF" />
        </svg>
        <span className="wallet-balance-amount">$1,240</span>
      </div>
      <button className="btn-recharge">Recharge</button>
      <div className="avatar ms-3"></div>
    </div>
  </header>
);

export default AppHeader;
