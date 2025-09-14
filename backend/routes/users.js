const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const { isAuthenticated } = require('../middlewares/auth');
const adminAuth = require('../middlewares/adminAuth');

// Apply authentication middleware to all routes
router.use(isAuthenticated);

// Apply admin authorization to all user management routes
router.use(adminAuth);

// GET /api/users - Get all users (Admin only)
router.get('/', AuthController.getAllUsers);

// GET /api/users/:id - Get user by ID (Admin only)
router.get('/:id', AuthController.getUserById);

// PUT /api/users/:id - Update user (Admin only)
router.put('/:id', AuthController.updateUser);

// DELETE /api/users/:id - Delete user (Admin only)
router.delete('/:id', AuthController.deleteUser);

module.exports = router;