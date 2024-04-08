const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken } = require("../middlewares/roleMiddleware");

const { registerUser, loginUser, getUserProfile, getImage } = userController; 

// Register a new user
router.post('/users/register', registerUser);

// Login
router.post('/users/login', loginUser);

// Get user profile by id
router.get('/users/profile/:id',verifyToken, getUserProfile);

// Update user profile
router.put('/users/editProfile/:id',verifyToken, getImage);

module.exports = router;
