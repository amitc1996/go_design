import React, { useState, useEffect } from "react";

const WalletModal = ({ onClose, onAddCredit, loading }) => {
  const [amount, setAmount] = useState("");

  const handleSubmit = () => {
    if (!amount || Number(amount) <= 0) return;
    onAddCredit(amount);
  };

  useEffect(() => {
    document.body.classList.add("modal-open");
    document.body.style.overflow = "hidden";
    return () => {
      document.body.classList.remove("modal-open");
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="custom-modal-backdrop" tabIndex="-1" onClick={onClose}>
      <div className="custom-modal-card" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="custom-btn-close"
          onClick={onClose}
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
            onClick={handleSubmit}
            disabled={!amount || Number(amount) <= 0 || loading}
          >
            {loading ? "Processing..." : "Add Credits"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WalletModal;
