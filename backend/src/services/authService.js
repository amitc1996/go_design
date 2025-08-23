import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";
import { Op } from "sequelize";

const signup = async (data) => {
  const user = await User.create(data);
  return { ...user.toJSON(), token: generateToken(user.id) };
};

const login = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (user && (await user.matchPassword(password))) {
    return { ...user.toJSON(), token: generateToken(user.id) };
  }
  throw new Error("Invalid email or password");
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

export default { signup, login, forgotPassword, resetPassword };
