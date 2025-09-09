const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middlewares/auth');
const passport = require('passport');

// Import controllers
const AuthController = require('../controllers/authController');

// Authentication routes
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/refresh-token', AuthController.refreshToken); 
router.post('/logout', AuthController.logout);
router.get('/me', isAuthenticated, AuthController.getCurrentUser);

module.exports = router;