// config.js
require('dotenv').config(); // Import and configure dotenv

const { Sequelize } = require('sequelize');

// Create a new Sequelize instance using environment variables
const sequelize = new Sequelize(process.env.POSTGRES_DATABASE, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
  host: process.env.POSTGRES_HOST,
  dialect: 'postgres',
  port: 5432, // Default PostgreSQL port
  logging: false, // Optional: Disable Sequelize logs
  dialectOptions: {
    ssl: {
      require: true, // Enforce SSL for secure connection
      rejectUnauthorized: false, // Allow self-signed certificates
    },
  },
});

// Test the database connection
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL database connected successfully');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

module.exports = { sequelize, connectDB };
