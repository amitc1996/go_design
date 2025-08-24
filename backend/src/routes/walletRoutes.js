import express from "express";
import {
  createOrder,
  verifyPayment,
  getWalletBalance,
  approveQuotation,
  getTransactions,
} from "../controllers/walletController.js";

const router = express.Router();

router.post("/create-order", createOrder);
router.post("/verify-payment", verifyPayment);
router.get("/balance/:userId", getWalletBalance);
router.post("/approve-quotation", approveQuotation);
router.get("/transactions/:userId", getTransactions);

export default router;
