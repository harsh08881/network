const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
      unique: true, // Each user should have one wallet
    },
    balance: {
      type: Number,
      default: 0, // Initial balance starts at zero
    },
    transactions: [
      {
        transactionType: {
          type: String,
          enum: ["credit", "debit"], // Transaction type
          required: true,
        },
        amount: {
          type: Number,
          required: true,
        },
        description: {
          type: String,
          default: "", // Optional transaction description
        },
        transactionDate: {
          type: Date,
          default: Date.now, // Date of the transaction
        },
      },
    ],
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt timestamps
  }
);

module.exports = mongoose.model("Wallet", walletSchema);
