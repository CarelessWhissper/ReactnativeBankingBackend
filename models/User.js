// models/User.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config"); // Ensure this imports the same sequelize instance

// Define the User model using sequelize.define
const User = sequelize.define(
  "User",
  {
    bankNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
 
  },
  {
    tableName: "users",
    timestamps: false,
  }
);

// Define association
User.associate = function(models) {
  User.hasMany(models.BankAccount, {
    foreignKey: 'userId', //  correct foreign key
    as: 'bankAccounts', // Alias for the associated bank accounts
  });
};

// Sync the User model with the database
User.sync()
  .then(() => console.log("User table created successfully"))
  .catch((error) => console.error("Error creating User table:", error));

module.exports = User;
