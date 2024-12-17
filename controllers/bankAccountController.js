// controllers/bankAccountController.js
const BankAccount = require('../models/BankAccount'); // Bank account model

// Get all bank accounts for a specific user
const getBankAccounts = async (req, res) => {
  const { userId } = req.params;

  try {
    const bankAccounts = await BankAccount.findAll({ where: { userId } });
    res.status(200).json({ bankAccounts });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bank accounts', error: error.message });
  }
};

// Set a specific bank account as active
const setActiveAccount = async (req, res) => {
  const { id } = req.params;

  try {
    const account = await BankAccount.findByPk(id);
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    account.isActive = true;
    await account.save();

    res.status(200).json({ message: 'Account set as active', account });
  } catch (error) {
    res.status(500).json({ message: 'Error updating account', error: error.message });
  }
};

// Update the balance of a specific bank account
const updateBalance = async (req, res) => {
  const { id } = req.params;
  const { balance } = req.body;

  try {
    const account = await BankAccount.findByPk(id);
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    account.balance = balance;
    await account.save();

    res.status(200).json({ message: 'Account balance updated', account });
  } catch (error) {
    res.status(500).json({ message: 'Error updating account balance', error: error.message });
  }
};

module.exports = { getBankAccounts, setActiveAccount, updateBalance };
