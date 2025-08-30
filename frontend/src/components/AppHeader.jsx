import React, { useState, useEffect } from "react";
import LogoImg1 from "src/assets/img/logo.png";
import "./AppHeader.scss"; // import CSS file

const AppHeader = () => {
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState("");

  const handleRechargeClick = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setAmount("");
  };
  const handleAddCredit = () => {
    alert(`Added credit: $${amount}`);
    handleClose();
  };

  useEffect(() => {
    if (showModal) {
      document.body.classList.add("modal-open");
      document.body.style.overflow = "hidden";
    } else {
      document.body.classList.remove("modal-open");
      document.body.style.overflow = "";
    }
  }, [showModal]);

  return (
    <>
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
          <button className="btn-recharge" onClick={handleRechargeClick}>
            Recharge
          </button>
          <div className="avatar ms-3"></div>
        </div>
      </header>

      {showModal && (
        <div
          className="custom-modal-backdrop"
          tabIndex="-1"
          onClick={handleClose}
        >
          <div
            className="custom-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="custom-btn-close"
              onClick={handleClose}
              aria-label="Close"
            >
              &times;
            </button>

            <div className="modal-title">Recharge Wallet</div>

            <div className="amount-input-row">
              <input
                type="text"
                className="amount-input"
                value={amount}
                onChange={(e) =>
                  setAmount(e.target.value.replace(/[^0-9]/g, ""))
                }
                placeholder="$ 0"
                min="1"
              />
              <button
                type="button"
                className="btn-add-credits"
                onClick={handleAddCredit}
                disabled={!amount || Number(amount) <= 0}
              >
                Add Credits
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AppHeader;
