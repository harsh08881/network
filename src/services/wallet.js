const Wallet = require("../models/wallet");

/**
 * Generate a wallet for a user.
 */
const generateWallet = async (userId) => {
  const existingWallet = await Wallet.findOne({ user: userId });
  if (existingWallet) throw new Error("Wallet already exists for this user.");

  const wallet = new Wallet({ user: userId });
  await wallet.save();
  return wallet;
};

/**
 * Get wallet details for a user.
 */
const getWallet = async (userId) => {
  const wallet = await Wallet.findOne({ user: userId }).populate("user");
  if (!wallet) throw new Error("Wallet not found for this user.");

  return wallet;
};

/**
 * Add balance to the wallet.
 */
const addBalance = async (userId, amount, description = "Balance added") => {
  const wallet = await Wallet.findOne({ user: userId });
  if (!wallet) throw new Error("Wallet not found for this user.");

  wallet.balance += amount;
  wallet.transactions.push({
    transactionType: "credit",
    amount,
    description,
  });

  await wallet.save();
  return wallet;
};

/**
 * Deduct balance from the wallet.
 */
const deductBalance = async (userId, amount, description = "Balance deducted") => {
  const wallet = await Wallet.findOne({ user: userId });
  if (!wallet) throw new Error("Wallet not found for this user.");

  if (wallet.balance < amount) throw new Error("Insufficient balance.");

  wallet.balance -= amount;
  wallet.transactions.push({
    transactionType: "debit",
    amount,
    description,
  });

  await wallet.save();
  return wallet;
};

module.exports = {
  generateWallet,
  getWallet,
  addBalance,
  deductBalance,
};
