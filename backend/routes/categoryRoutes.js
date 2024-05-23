const express = require('express');
const router = express.Router();
const { verifyToken } = require("../middlewares/roleMiddleware");

const {getCategory, createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory } = require('../controllers/categoryController');

// Create a new category
router.post('/createCategory',verifyToken, createCategory);

// Get all categories
router.get('/allCategory',verifyToken, getAllCategories);

// Get all categories
router.get('/getCategory',verifyToken, getCategory);

// Update a category
router.put('/category/:id',verifyToken, updateCategory); 

// Delete a category
router.delete('/deleteCategory/:id',verifyToken, deleteCategory);

module.exports = router;
