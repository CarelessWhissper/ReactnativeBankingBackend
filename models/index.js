// models/index.js
const User = require('./User');
const BankAccount = require('./BankAccount');

// Set up associations
User.hasMany(BankAccount, {
  foreignKey: 'userId',
  as: 'bankAccounts',
});

// Sync all models
Promise.all([
  User.sync(),
  BankAccount.sync(),
])
  .then(() => {
    console.log('All tables created successfully');
  })
  .catch((error) => {
    console.error('Error creating tables:', error);
  });

module.exports = {
  User,
  BankAccount,
};
