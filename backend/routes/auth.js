const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middlewares/auth');
const passport = require('passport');

// Import controllers
const AuthController = require('../controllers/authController');

// Authentication routes
router.get('/', AuthController.get); // this route is no need, since frontend could handle it itself
router.get('/register', AuthController.getRegister); // this route is no need, since frontend could handle it itself
router.post('/register', AuthController.register);
router.get('/login', AuthController.getLogin); // this route is no need, since frontend could handle it itself
router.post('/login', AuthController.login);
router.post('/refresh-token', AuthController.refreshToken); // completed
router.post('/logout', AuthController.logout);
router.get('/me', isAuthenticated, AuthController.getCurrentUser);

module.exports = router;