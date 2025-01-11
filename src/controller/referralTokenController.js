const crypto = require("crypto");
const ReferralToken = require("../models/referralToken");

const generateReferralToken = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Check if a referral token already exists for the user
    const existingToken = await ReferralToken.findOne({ user: userId });
    if (existingToken) {
      return res.status(400).json({ message: "Referral token already exists." });
    }

    // Generate a unique token
    const token = crypto.randomBytes(4).toString("hex");

    // Create and save the referral token
    const referralToken = new ReferralToken({
      user: userId,
      token,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Token expires in 7 days
    });

    await referralToken.save();

    return res.status(200).json({
      message: "Referral token generated successfully.",
      token: referralToken.token,
    });
  } catch (error) {
    console.error("Error generating referral token:", error);
    return res.status(500).json({ message: "An error occurred while generating the referral token." });
  }
};


const getReferralToken = async (req, res) => {
    try {
      const userId = req.user.id;
  
      const referralToken = await ReferralToken.findOne({ user: userId });
  
      if (!referralToken) {
        return res.status(404).json({ message: "Referral token not found." });
      }
  
      return res.status(200).json({
        message: "Referral token retrieved successfully.",
        token: referralToken.token,
      });
    } catch (error) {
      console.error("Error retrieving referral token:", error);
      return res.status(500).json({ message: "An error occurred while retrieving the referral token." });
    }
  };
  

  module.exports ={
    generateReferralToken,
    getReferralToken
  }