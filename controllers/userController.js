// controllers/userController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // User model defined using Sequelize
const BankAccount  = require("../models/BankAccount") // bank acc  model defined using Sequelize
// Register a new user
const registerUser = async (req, res) => {
  const { bankNumber, password, email, name } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({
      bankNumber,
      password: hashedPassword,
      email,
      name,
    });

    res.status(201).json({ message: 'User registered successfully', newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

// Log in an existing user
const loginUser = async (req, res) => {
  const { bankNumber, password } = req.body; 
  try {
    // Find user by bank number
    const user = await User.findOne({ where: { bankNumber } });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Compare provided password with stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Create JWT token for authentication
    const token = jwt.sign({ userId: user.id }, '123abcd', { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token, user });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};


// Get user details by ID along with their bank accounts
const getUserDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] },
      include: [
        {
          model: BankAccount,
          as: 'bankAccounts', // Include bank accounts in the response
        },
      ],
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user details', error: error.message });
  }
};

module.exports = { registerUser, loginUser, getUserDetails };
