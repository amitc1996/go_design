import User from "../models/userModel.js";
import { generateAccessToken, generateRefreshToken } from "../utils/tokenUtils.js";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";
import { Op } from "sequelize";

const signup = async (data) => {
  const user = await User.create(data);
  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);
  return { ...user.toJSON(), accessToken, refreshToken, token_type: "bearer", expires_in: 1800 };
};

const login = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (user && (await user.matchPassword(password))) {
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);
    return { ...user.toJSON(), accessToken, refreshToken, token_type: "bearer", expires_in: 1800 };
  }
  throw new Error("Invalid email or password");
};

const refreshAccessToken = async (refreshToken) => {
  // You should validate the refreshToken and check if it's not revoked
  try {
    const payload = require("jsonwebtoken").verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const accessToken = generateAccessToken(payload.id);
    return { accessToken, token_type: "bearer", expires_in: 1800 };
  } catch (err) {
    throw new Error("Invalid or expired refresh token");
  }
};

const forgotPassword = async (email) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("User not found");

  const resetToken = crypto.randomBytes(20).toString("hex");
  user.resetToken = resetToken;
  user.resetTokenExpire = Date.now() + 10 * 60 * 1000;
  await user.save();

  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
  await sendEmail(user.email, "Password Reset", `Reset here: ${resetUrl}`);
  return { message: "Password reset email sent" };
};

const resetPassword = async (token, newPassword) => {
  const user = await User.findOne({
    where: {
      resetToken: token,
      resetTokenExpire: { [Op.gt]: Date.now() }
    }
  });

  if (!user) throw new Error("Invalid or expired token");

  user.password = newPassword;
  user.resetToken = null;
  user.resetTokenExpire = null;
  await user.save();

  return { message: "Password reset successful" };
};

export default { signup, login, forgotPassword, resetPassword, refreshAccessToken };