const Wallet = require("../models/wallet");
const User = require("../models/user"); 


// Get Wallet Balance
const getWalletBalance = async (req, res) => {
  try {
    const userId = req.user.id; // Assumes you are using a middleware to get the logged-in user ID

    // Find the wallet by user ID
    const wallet = await Wallet.findOne({ user: userId });

    if (!wallet) {
      return res.status(404).json({ message: "Wallet not found" });
    }

    return res.status(200).json({ balance: wallet.balance });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { getWalletBalance };
