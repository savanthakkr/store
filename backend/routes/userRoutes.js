const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken } = require("../middlewares/roleMiddleware");
const {adminLoginUser, registerUser, loginUser, getUserProfile, getImage, OTPVerify, sendPasswordOTP, OTPVerifyEmail, updatepassword } = userController; 

// Register a new user
router.post('/users/register',  registerUser);

// send a password OTP
router.post('/users/passwordOTP', sendPasswordOTP);

// send a OTP email
router.post('/users/otpEmail', OTPVerifyEmail);

// verify a OTP 
router.post('/users/otp', OTPVerify);

// Login user
router.post('/users/login', loginUser);

// admin Login user
router.post('/users/adminLoginUser', adminLoginUser);

// Get user profile by id
router.get('/users/profile/:id',verifyToken, getUserProfile);

// Update user profile 
router.put('/users/editProfile/:id',verifyToken, getImage); 

// Update user password
router.put('/users/updatePass',verifyToken, updatepassword); 

module.exports = router;
