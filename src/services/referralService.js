const ReferralToken = require('../models/referralToken');
const Referral = require('../models/referral');
const User = require('../models/user');

const processReferral = async (user, referralCode) => {
  try {
    // Find the referral token from the code
    const referralToken = await ReferralToken.findOne({ token: referralCode, isActive: true });

    if (!referralToken) {
      throw new Error("Invalid or expired referral code.");
    }

    // Find the referrer (user who shared the referral code)
    const referrer = await User.findById(referralToken.user);
    if (!referrer) {
      throw new Error("Referrer not found.");
    }

    // Check if the referral already exists (to avoid duplicates)
    const existingReferral = await Referral.findOne({ referrer: referrer._id, referredUser: user._id });
    if (existingReferral) {
      throw new Error("Referral already processed.");
    }

    // Create or update the referral record
    const newReferral = new Referral({
      referrer: referrer._id,
      referredUser: user._id,
      referralCode: referralCode,
      rewardEarned: 0, // You can modify the reward logic here
    });

    // Save the referral record
    await newReferral.save();

    // Mark the referral token as used
    referralToken.isActive = false;
    await referralToken.save();

    return { success: true, referrer };
  } catch (error) {
    console.error("Error processing referral:", error);
    throw error;
  }
};

module.exports = {
  processReferral,
};
