// routes/bankAccountRoutes.js
const express = require('express');
const router = express.Router();
const { getBankAccounts, setActiveAccount, updateBalance } = require('../controllers/bankAccountController');

// GET /api/accounts/user/:userId - Get all bank accounts for a specific user
router.get('/user/:userId', getBankAccounts);

// PUT /api/accounts/:id/active - Set a specific bank account as active
router.put('/:id/active', setActiveAccount);

// PUT /api/accounts/:id/balance - Update the balance of a specific bank account
router.put('/:id/balance', updateBalance);

module.exports = router;
