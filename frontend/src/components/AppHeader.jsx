import React, { useState, useEffect } from "react";
import LogoImg1 from "src/assets/img/logo.png";

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

  // Handle body scroll lock
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

      {/* React-controlled Modal */}
      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block" }}
          tabIndex="-1"
          onClick={handleClose} // backdrop click
        >
          <div
            className="modal-dialog"
            onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Credit</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleClose}
                ></button>
              </div>
              <div className="modal-body">
                <label htmlFor="amount" className="form-label">
                  Amount
                </label>
                <input
                  type="number"
                  id="amount"
                  className="form-control"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="1"
                  placeholder="Enter amount"
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleClose}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleAddCredit}
                  disabled={!amount || Number(amount) <= 0}
                >
                  Add Credit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AppHeader;
