// models/BankAccount.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config"); // Ensure you are importing the correct sequelize instance
const User = require("./User"); // Ensure User is imported correctly

// Define the BankAccount model using sequelize.define
const BankAccount = sequelize.define(
  "BankAccount",
  {
    accountNumber: {
      type: DataTypes.STRING,
      allowNull: false,
     
    },
    accountName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    balance: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "users", // Make sure this matches the User model table name
        key: "id",
      },
    },
 
  },
  {
    tableName: "bank_accounts",
    timestamps: false,
  }
);

// Define association
BankAccount.associate = function(models) {
  BankAccount.belongsTo(models.User, {
    foreignKey: 'userId', // Reference the userId field
    as: 'user', // Alias for the associated user
  });
};

// Sync the BankAccount model with the database
BankAccount.sync()
  .then(() => console.log("BankAccount table created successfully"))
  .catch((error) => console.error("Error creating BankAccount table:", error));

module.exports = BankAccount;
