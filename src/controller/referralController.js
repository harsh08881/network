const Referral = require('../models/referral');


const getReferralDetails = async (req, res) => {
    try {
      const userId = req.user.id;
  
      const referrals = await Referral.find({ referrer: userId });
  
      if (referrals.length === 0) {
        return res.status(404).json({ message: "No referrals found" });
      }
  
      return res.status(200).json(referrals);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  };

  
  module.exports ={
    getReferralDetails
  }