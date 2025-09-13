const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

class AuthController {
  // GET / - Main auth page (not needed for API, but included for completeness)
  static async get(req, res) {
    try {
      res.json({
        success: true,
        message: 'Authentication service is running',
        endpoints: {
          register: 'POST /auth/register',
          login: 'POST /auth/login',
          refreshToken: 'POST /auth/refresh-token'
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server error',
        error: error.message
      });
    }
  }

  // GET /register - Register page info (not needed for API)
  static async getRegister(req, res) {
    try {
      res.json({
        success: true,
        message: 'Register endpoint info',
        fields: {
          name: 'string (required)',
          email: 'string (required, unique)',
          password: 'string (required, min 6 characters)',
          role: 'enum (ADMIN, MAIN_MANAGER) - optional, defaults to ADMIN'
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server error',
        error: error.message
      });
    }
  }

  // POST /register - User registration
  static async register(req, res) {
    try {
      console.log("1. Starting registration process");
      console.log("Request body:", req.body);
      
      const { name, email, password, role = 'ADMIN' } = req.body;

      // Enhanced validation with specific error messages
      if (!email) {
        return res.status(200).json({
          success: false,
          message: 'Email is required'
        });
      }

      if (!name) {
        return res.status(200).json({
          success: false,
          message: 'Name is required'
        });
      }

      if (!password) {
        return res.status(200).json({
          success: false,
          message: 'Password is required'
        });
      }

      if (password.length < 6) {
        return res.status(200).json({
          success: false,
          message: 'Password must be at least 6 characters long'
        });
      }

      console.log("2. Received form data:", { name, email, role });

      // Check if user already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(200).json({
          success: false,
          message: 'Email already in use. Please use a different email address.'
        });
      }

      // Hash password
      const saltRounds = 12;
      const passwordHash = await bcrypt.hash(password, saltRounds);

      // Create user
      const user = await User.create({
        name,
        email,
        passwordHash,
        role
      });
      console.log("3. User created with ID:", user.id);

      // Prepare consistent user data structure
      const userData = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      };

      // Generate JWT token with consistent payload
      const token = jwt.sign(
        userData,
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      // Generate refresh token
      const refreshToken = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET || process.env.JWT_SECRET,
        { expiresIn: '30d' }
      );

      // Store user session
      req.session.userId = user.id;
      req.session.user = userData;
      console.log("4. Session set for user:", req.session.user);

      // Enhanced cookie security settings
      res.cookie('token', token, {
        httpOnly: true,      // Prevent JS access
        secure: process.env.NODE_ENV === 'production',        // Only HTTPS in production
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',  // Protect CSRF
        maxAge: 60 * 60 * 1000, // 1 hour in ms
        path: '/'
      });

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        path: '/'
      });

      // Send JSON response for API requests
      return res.status(200).json({
        success: true,
        user: userData,
        message: 'User registered successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server error during registration',
        error: error.message
      });
    }
  }

  // GET /login - Login page info (not needed for API)
  static async getLogin(req, res) {
    try {
      res.json({
        success: true,
        message: 'Login endpoint info',
        fields: {
          email: 'string (required)',
          password: 'string (required)'
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server error',
        error: error.message
      });
    }
  }

  // POST /login - User login
  static async login(req, res) {
    try {
      console.log("1. Starting login process");
      const { email, password } = req.body;
      console.log("2. Received login data:", { email });

      // Enhanced validation
      if (!email) {
        return res.status(400).json({
          success: false,
          message: 'Email is required'
        });
      }

      if (!password) {
        return res.status(400).json({
          success: false,
          message: 'Password is required'
        });
      }

      // Find user
      const user = await User.findOne({ where: { email } });
      console.log("3. User lookup result:", user ? 'User found' : 'User not found');

      if (!user) {
        console.log("User not found in database");
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }

      console.log("User found, validating password");
      // Enhanced password validation with error handling
      let isValidPassword = false;

      try {
        // Ensure both password and stored hash are strings
        const passwordString = String(password);
        const storedHash = String(user.passwordHash);
        
        isValidPassword = await bcrypt.compare(passwordString, storedHash);
        console.log("Password validation successful:", isValidPassword);
      } catch (error) {
        console.error("Error validating password:", error);
        return res.status(500).json({
          success: false,
          message: 'Error validating password'
        });
      }

      console.log("Password validation result:", isValidPassword);

      if (!isValidPassword) {
        console.log("Password validation failed");
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }

      // Prepare consistent user data structure
      const userData = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      };

      // Generate JWT token
      const token = jwt.sign(
        userData,
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      // Generate refresh token
      const refreshToken = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET || process.env.JWT_SECRET,
        { expiresIn: '30d' }
      );

      // Store user session
      req.session.userId = user.id;
      req.session.user = userData;
      console.log("4. Session set for user:", req.session.user);

      // Enhanced cookie security settings
      res.cookie('token', token, {
        httpOnly: true,      // Prevent JS access
        secure: process.env.NODE_ENV === 'production',        // Only HTTPS in production
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',  // Protect CSRF
        maxAge: 60 * 60 * 1000, // 1 hour in ms
        path: '/'
      });

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        path: '/'
      });

      return res.status(200).json({
        success: true,
        message: 'User logged in successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server error during login',
        error: error.message
      });
    }
  }

  // POST /refresh-token - Refresh JWT token
  static async refreshToken(req, res) {
    try {
      // Try to get refresh token from body, cookies, or headers
      const refreshToken = req.body.refreshToken || 
                          req.cookies.refreshToken || 
                          req.header('X-Refresh-Token');

      if (!refreshToken) {
        return res.status(400).json({
          success: false,
          message: 'Refresh token is required'
        });
      }

      // Verify refresh token
      const decoded = jwt.verify(
        refreshToken,
        process.env.JWT_SECRET || process.env.JWT_SECRET
      );

      // Find user
      const user = await User.findByPk(decoded.id);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid refresh token. User not found.'
        });
      }

      // Prepare consistent user data structure
      const userData = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      };

      // Generate new JWT token
      const newToken = jwt.sign(
        userData,
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      // Generate new refresh token
      const newRefreshToken = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET || process.env.JWT_SECRET,
        { expiresIn: '30d' }
      );

      // Update session
      req.session.userId = user.id;
      req.session.user = userData;

      // Set new cookies with enhanced security
      res.cookie('token', newToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 60 * 60 * 1000, // 1 hour
        path: '/'
      });

      res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        path: '/'
      });

      return res.status(200).json({
        success: true,
        message: 'Access token refreshed'
      });
    } catch (error) {
      if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
        return res.status(401).json({
          success: false,
          message: 'Invalid or expired refresh token'
        });
      }

      res.status(500).json({
        success: false,
        message: 'Server error during token refresh',
        error: error.message
      });
    }
  }

  // POST /logout - User logout
  static async logout(req, res) {
    try {
      // Clear session
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: 'Could not log out, please try again'
          });
        }
      });

      // Clear cookies
      res.clearCookie('token');
      res.clearCookie('refreshToken');
      res.clearCookie('tutelage.sid');

      res.json({
        success: true,
        message: 'Logged out successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server error during logout',
        error: error.message
      });
    }
  }

  // GET /me - Get current user info
  static async getCurrentUser(req, res) {
    try {
      if (req.user) {
        res.json({
          success: true,
          data: {
            user: {
              id: req.user.id,
              name: req.user.name,
              email: req.user.email,
              role: req.user.role
            }
          }
        });
      } else {
        res.status(401).json({
          success: false,
          message: 'Not authenticated'
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server error',
        error: error.message
      });
    }
  }
}

module.exports = AuthController;