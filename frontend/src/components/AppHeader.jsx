import React, { useState, useEffect } from "react";
import LogoImg1 from "src/assets/img/logo.png";
import "./AppHeader.scss";
import WalletModal from "./WalletModal";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { rechargeWallet } from "./paymentHelper";
import WalletImg from "src/assets/img/Vector.png";
import { useAuthState } from "src/store/AuthContext"; 

const AppHeader = () => {
  const [showModal, setShowModal] = useState(false);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);

  const { user } = useAuthState(); 
  const userId = user?.id; 

  const fetchBalance = async () => {
    if (!userId) return; 
    try {
      const res = await axios.get(
        `http://localhost:5000/api/wallet/balance/${userId}`
      );
      setBalance(res.data.balance);
    } catch (error) {
      console.error("Failed to fetch balance:", error);
    }
  };

  const handleRechargeClick = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleAddCredit = async (amount) => {
    if (!userId) return; 
    setLoading(true);
    try {
      const result = await rechargeWallet({
        amount: Number(amount),
        userId,
        onCheckoutOpen: handleClose,
      });

      console.log("Payment success:", result);
      toast.success("Recharge successful");
      fetchBalance();
    } catch (error) {
      console.error("Payment failed:", error.message);
      toast.error(error.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, [userId]); 

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
            <img src={WalletImg} alt="" />
            <span className="wallet-balance-amount">${balance}</span>
          </div>
          <button className="btn-recharge" onClick={handleRechargeClick}>
            Recharge
          </button>
          <div className="avatar ms-3"></div>
        </div>
      </header>

      {showModal && (
        <WalletModal
          onClose={handleClose}
          onAddCredit={handleAddCredit}
          loading={loading}
        />
      )}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </>
  );
};

export default AppHeader;
