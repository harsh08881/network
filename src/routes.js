const express = require("express");
const router = express.Router();
const userController = require("./controller/userControllers");
const walletController = require('./controller/walletController');
const referralController = require('./controller/referralController')
const referralTokenController = require('./controller/referralTokenController');
const authenticateUser = require('./middleware/authMiddleware')
const validateFields = require('./middleware/validateFields');

router.get("/", (req, res) => {
    res.send("Welcome to the Theta Network");
});


router.post('/generate',validateFields(['name', 'mobileNumber']), userController.generateUserName);
router.post('/register',validateFields(['username', 'mobileNumber' , 'email' , 'password' , 'firstName', 'lastName']), userController.registerUser);
router.post('/login',validateFields([ 'email', 'password']), userController.loginUser);
router.get('/profile', authenticateUser, userController.getProfileDetails);


router.get('/getbalance',authenticateUser, walletController.getWalletBalance);


router.get('/referrallist',authenticateUser, referralController.getReferralDetails);


router.get('/referralToken',authenticateUser, referralTokenController.getReferralToken);
router.get('/generateToken', authenticateUser, referralTokenController.generateReferralToken);



router.get('*' , (req,res) => {
    res.send("Route Not Found");
})
router.post('*' , (req,res) => {
    res.send("Route Not Found");
})




module.exports = router;