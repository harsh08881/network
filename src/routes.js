const express = require("express");
const router = express.Router();
const userController = require("./controller/userControllers");
const walletController = require('./controller/walletController')
// const validateFields = require('../middleware/checkfield');
router.get("/", (req, res) => {
    res.send("Server is running successfully!");
});


router.post('/generate', userController.generateUserName);
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);


router.get('/getbalance', walletController.getWalletBalance);







router.get('*' , (req,res) => {
    res.send("Handle By *");
})





module.exports = router;