// server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { connectDB } = require("./config");
const userRoutes = require("./routes/userRoutes"); // Import user routes
const bankAccountRoutes = require("./routes/bankAccountRoutes"); // Import bank account routes
const User = require("./models/User"); // Import models
const BankAccount = require("./models/BankAccount"); // Import models
const transferRoute = require('./routes/transfer'); // import transfer route

User.associate({ BankAccount }); // Apply the association
BankAccount.associate({ User });

// Initialize the Express app
const app = express();

// Middleware setup
app.use(cors()); // Allow all origins

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to the MySQL database
connectDB();

// Define API routes
app.use("/api/users", userRoutes); // Route for user-related operations
app.use("/api/accounts", bankAccountRoutes); // Route for bank account operations
app.use("/api/transfer", transferRoute); // Correct route for transfer operations

// Root endpoint
app.get("/", (req, res) => {
  res.send("Welcome to the Nighting Bank API");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: "An error occurred!", error: err.message });
});

// Start the server on port 5000
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
