import { DataTypes } from "sequelize";
import bcrypt from "bcryptjs";
import sequelize from "../config/db.js";

const User = sequelize.define("user", {
  id: { 
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: { 
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  first_name: { 
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  last_name: { 
    type: DataTypes.STRING(255),   
    allowNull: false,
  },
  phone: { 
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  company_name: { 
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  password: { 
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  reset_token: { 
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  reset_token_expire: { 
    type: DataTypes.DATE,
    allowNull: true,
  },
  remember_token: { 
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  status: { 
    type: DataTypes.TINYINT,
    defaultValue: 0,
  },
  wallet_balance: { 
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    defaultValue: 0.00,
  },
  email_verified_at: { 
    type: DataTypes.DATE,
    allowNull: true,
  },
  new_email: { 
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  new_email_token: { 
    type: DataTypes.STRING(255),
    allowNull: true,
  }
}, {
  timestamps: true,       // ✅ created_at & updated_at managed automatically
  paranoid: true,         // ✅ enables deleted_at for soft deletes
  underscored: true,      // ✅ use snake_case column names
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

// Instance methods
User.prototype.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

User.prototype.addToWallet = async function (amount) {
  this.wallet_balance = parseFloat(this.wallet_balance) + parseFloat(amount);
  await this.save();
  return this.wallet_balance;
};

User.prototype.deductFromWallet = async function (amount) {
  if (parseFloat(this.wallet_balance) < parseFloat(amount)) {
    throw new Error("Insufficient wallet balance");
  }
  this.wallet_balance = parseFloat(this.wallet_balance) - parseFloat(amount);
  await this.save();
  return this.wallet_balance;
};

export default User;
