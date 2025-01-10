const express = require("express");
const router = express.Router();
const userController = require("./controller/userControllers");
// const validateFields = require('../middleware/checkfield');

router.post('/generate', userController.generateUserName);
router.get('/register', userController.registerUser);


module.exports = router;