const Wallet = require("../models/wallet");

const updateWallet = async (userId, amount, transactionType, description = "") => {
  try {
    // Find the wallet for the user
    let wallet = await Wallet.findOne({ user: userId });

    // Create a wallet if it doesn't exist
    if (!wallet) {
      wallet = new Wallet({ user: userId });
    }

    // Update the wallet balance
    if (transactionType === "credit") {
      wallet.balance += amount;
    } else if (transactionType === "debit") {
      if (wallet.balance < amount) {
        throw new Error("Insufficient balance");
      }
      wallet.balance -= amount;
    } else {
      throw new Error("Invalid transaction type");
    }

    // Add the transaction to the transactions array
    wallet.transactions.push({
      transactionType,
      amount,
      description,
    });

    // Save the wallet
    await wallet.save();
    return wallet;
  } catch (error) {
    console.error("Error updating wallet:", error);
    throw error;
  }
};

module.exports = {
  updateWallet,
};
