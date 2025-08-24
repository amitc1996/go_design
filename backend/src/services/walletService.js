import Razorpay from "razorpay";
import crypto from "crypto";
import User from "../models/userModel.js";
import Transaction from "../models/transactionModel.js";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});

const createOrder = async (amount) => {
  const options = {
    amount: amount * 100,
    currency: "INR",
    receipt: `wallet_recharge_${Date.now()}`,
  };
  return await razorpay.orders.create(options);
};

const verifyPayment = async ({ razorpay_order_id, razorpay_payment_id, razorpay_signature, userId, amount }) => {
  const sign = crypto
    .createHmac("sha256", razorpay.key_secret)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");
  if (sign !== razorpay_signature) {
    throw new Error("Payment verification failed");
  }
  const user = await User.findByPk(userId);
  user.walletBalance += amount;
  await user.save();
  await Transaction.create({
    userId,
    type: "CREDIT",
    amount,
    description: "Wallet recharge",
  });
  return user.walletBalance;
};

const getWalletBalance = async (userId) => {
  const user = await User.findByPk(userId);
  return user.walletBalance;
};

const approveQuotation = async (userId, amount) => {
  const user = await User.findByPk(userId);
  if (user.walletBalance < amount) {
    throw new Error("Insufficient balance");
  }
  user.walletBalance -= amount;
  await user.save();
  await Transaction.create({
    userId,
    type: "DEBIT",
    amount,
    description: "Quotation approved, order placed",
  });
  return user.walletBalance;
};

const getTransactions = async (userId) => {
  return await Transaction.findAll({
    where: { userId },
    order: [["createdAt", "DESC"]],
  });
};

export default {
  createOrder,
  verifyPayment,
  getWalletBalance,
  approveQuotation,
  getTransactions,
};
