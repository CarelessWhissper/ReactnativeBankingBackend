// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserDetails } = require('../controllers/userController');

// POST /api/users/register - Register a new user
router.post('/register', registerUser);

// POST /api/users/login - Log in a user
router.post('/login', loginUser);

// GET /api/users/:id - Get user details by ID (protected route)
router.get('/:id', getUserDetails);

module.exports = router;
