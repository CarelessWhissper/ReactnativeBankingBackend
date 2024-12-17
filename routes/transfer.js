// routes/transfer.js
const express = require("express");
const User = require('../models/User'); // User model defined using Sequelize
const BankAccount  = require("../models/BankAccount") // bank acc  model defined using Sequelize
const router = express.Router();

// Transfer Funds Route
router.post("/", async (req, res) => {
  const { amount, recipientBankNumber, senderAccountId } = req.body;

  try {
    // Validate input
    if (!amount || !recipientBankNumber || !senderAccountId) {
      return res.status(400).json({ message: "Amount, recipient bank number, and sender account ID are required." });
    }

    // Find the recipient's account by their bank number
    const recipientAccount = await BankAccount.findOne({ where: { accountNumber: recipientBankNumber } });

    if (!recipientAccount) {
      return res.status(404).json({ message: "Recipient account not found." });
    }

    // Get the sender's account based on the provided senderAccountId
    const senderAccount = await BankAccount.findByPk(senderAccountId);

    if (!senderAccount) {
      return res.status(404).json({ message: "Sender account not found." });
    }

    // Check if sender has sufficient balance
    if (senderAccount.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance." });
    }

    // Deduct amount from the sender's balance
    await BankAccount.update(
      { balance: senderAccount.balance - amount },
      { where: { id: senderAccount.id } }
    );

    // Add amount to the recipient's balance
    await BankAccount.update(
      { balance: recipientAccount.balance + amount },
      { where: { accountNumber: recipientBankNumber } }
    );

    res.status(200).json({ message: "Transfer successful." });
  } catch (error) {
    console.error("Transfer error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

  module.exports = router;