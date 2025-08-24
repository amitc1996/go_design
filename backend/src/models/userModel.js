import { DataTypes } from "sequelize";
import bcrypt from "bcryptjs";
import sequelize from "../config/db.js";

const User = sequelize.define("user", {
  id: { 
    type: DataTypes.INTEGER, 
    autoIncrement: true, 
    primaryKey: true 
  },
  name: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  email: { 
    type: DataTypes.STRING, 
    allowNull: false, 
    unique: true 
  },
  password: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  resetToken: { 
    type: DataTypes.STRING, 
    allowNull: true 
  },
  resetTokenExpire: { 
    type: DataTypes.DATE, 
    allowNull: true 
  },
  walletBalance: { 
    type: DataTypes.FLOAT, 
    defaultValue: 0 
  }
}, {
  timestamps: true,
  hooks: {
    beforeCreate: async (user) => {
      user.password = await bcrypt.hash(user.password, 10);
    },
    beforeUpdate: async (user) => {
      if (user.changed("password")) {
        user.password = await bcrypt.hash(user.password, 10);
      }
    }
  }
});

// instance method to check password
User.prototype.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// helper methods for wallet
User.prototype.addToWallet = async function (amount) {
  this.walletBalance += amount;
  await this.save();
  return this.walletBalance;
};

User.prototype.deductFromWallet = async function (amount) {
  if (this.walletBalance < amount) {
    throw new Error("Insufficient wallet balance");
  }
  this.walletBalance -= amount;
  await this.save();
  return this.walletBalance;
};

export default User;
