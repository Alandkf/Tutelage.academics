// ============================================================================
// AUTHENTICATION CONTROLLER
// ============================================================================
// Handles user authentication, registration, login, logout, and user management
// Provides JWT-based authentication with refresh token support

// Dependencies
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Constants
const BCRYPT_SALT_ROUNDS = 10;
const JWT_ACCESS_TOKEN_EXPIRY = '1h';
const JWT_REFRESH_TOKEN_EXPIRY = '30d';
const COOKIE_MAX_AGE_ACCESS = 60 * 60 * 1000; // 1 hour
const COOKIE_MAX_AGE_REFRESH = 30 * 24 * 60 * 60 * 1000; // 30 days
const MIN_PASSWORD_LENGTH = 6;

/**
 * Authentication Controller Class
 * Manages all authentication-related operations including user registration,
 * login, logout, token refresh, and user management functions
 */
class AuthController {
  
  // ============================================================================
  // HELPER METHODS
  // ============================================================================
  
  /**
   * Generate secure cookie options based on environment
   * @param {number} maxAge - Cookie max age in milliseconds
   * @returns {Object} Cookie configuration object
   */
  static getCookieOptions(maxAge) {
    return {
      httpOnly: true,
      domain: process.env.MAIN_DOMAIN || 'localhost',
      secure: true,
      sameSite: 'none',
      maxAge,
      path: '/'
    };
  }
  
  /**
   * Create standardized user data object
   * @param {Object} user - User model instance
   * @returns {Object} Sanitized user data
   */
  static createUserDataObject(user) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };
  }
  
  /**
   * Generate JWT access token
   * @param {Object} userData - User data to encode in token
   * @returns {string} JWT access token
   */
  static generateAccessToken(userData) {
    return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: JWT_ACCESS_TOKEN_EXPIRY });
  }
  
  /**
   * Generate JWT refresh token
   * @param {number} userId - User ID to encode in token
   * @returns {string} JWT refresh token
   */
  static generateRefreshToken(userId) {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: JWT_REFRESH_TOKEN_EXPIRY });
  }
  
  /**
   * Set authentication cookies on response
   * @param {Object} res - Express response object
   * @param {string} accessToken - JWT access token
   * @param {string} refreshToken - JWT refresh token
   */
  static setAuthenticationCookies(res, accessToken, refreshToken) {
    res.cookie('token', accessToken, this.getCookieOptions(COOKIE_MAX_AGE_ACCESS));
    res.cookie('refreshToken', refreshToken, this.getCookieOptions(COOKIE_MAX_AGE_REFRESH));
  }
  
  // ============================================================================
  // API INFORMATION ENDPOINTS
  // ============================================================================
  
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

  // ============================================================================
  // AUTHENTICATION ENDPOINTS
  // ============================================================================
  
  /**
   * POST /register - User registration endpoint
   * Creates a new user account with validation and authentication setup
   */
  static async register(req, res) {
    try {
      console.log('🔐 Starting user registration process');
      
      const { name, email, password, role = 'ADMIN' } = req.body;
      console.log('📝 Registration attempt for:', { name, email, role });

      // Input validation
      const validationError = AuthController.validateRegistrationInput({ name, email, password });
      if (validationError) {
        return res.status(400).json({
          success: false,
          message: validationError
        });
      }

      // Check for existing user
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        console.log('❌ Registration failed: Email already exists');
        return res.status(409).json({
          success: false,
          message: 'Email already in use. Please use a different email address.'
        });
      }

      // Hash password and create user
      const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
      const newUser = await User.create({
        name,
        email,
        passwordHash: hashedPassword,
        role
      });
      
      console.log('✅ User created successfully with ID:', newUser.id);

      // Generate user data and tokens
      const userData = AuthController.createUserDataObject(newUser);
      const accessToken = AuthController.generateAccessToken(userData);
      const refreshToken = AuthController.generateRefreshToken(newUser.id);

      // Set up user session
      req.session.userId = newUser.id;
      req.session.user = userData;
      console.log('🔑 Session established for user:', userData.email);

      // Set authentication cookies
      AuthController.setAuthenticationCookies(res, accessToken, refreshToken);

      return res.status(201).json({
        success: true,
        user: userData,
        message: 'User registered successfully'
      });
      
    } catch (error) {
      console.error('❌ Registration error:', error);
      return res.status(500).json({
        success: false,
        message: 'Server error during registration',
        error: error.message
      });
    }
  }
  
  /**
   * Validate registration input data
   * @param {Object} data - Registration data to validate
   * @returns {string|null} Error message or null if valid
   */
  static validateRegistrationInput({ name, email, password }) {
    if (!email) return 'Email is required';
    if (!name) return 'Name is required';
    if (!password) return 'Password is required';
    if (password.length < MIN_PASSWORD_LENGTH) {
      return `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`;
    }
    
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Please provide a valid email address';
    }
    
    return null;
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

  /**
   * POST /login - User authentication endpoint
   * Authenticates user credentials and establishes session
   */
  static async login(req, res) {
    try {
      console.log('🔐 Starting user login process');
      
      const { email, password } = req.body;
      console.log('📝 Login attempt for email:', email);

      // Input validation
      const validationError = AuthController.validateLoginInput({ email, password });
      if (validationError) {
        return res.status(400).json({
          success: false,
          message: validationError
        });
      }

      // Find and authenticate user
      const user = await User.findOne({ where: { email } });
      if (!user) {
        console.log('❌ Login failed: User not found');
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
      if (!isPasswordValid) {
        console.log('❌ Login failed: Invalid password');
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }

      // Check if user account is active
      if (!user.isActive) {
        console.log('❌ Login failed: Account deactivated');
        return res.status(403).json({
          success: false,
          message: 'Account has been deactivated. Please contact an administrator.'
        });
      }

      console.log('✅ User authenticated successfully:', user.id);

      // Generate user data and tokens
      const userData = AuthController.createUserDataObject(user);
      const accessToken = AuthController.generateAccessToken(userData);
      const refreshToken = AuthController.generateRefreshToken(user.id);

      // Set up user session
      req.session.userId = user.id;
      req.session.user = userData;
      console.log('🔑 Session established for user:', userData.email);

      // Set authentication cookies
      AuthController.setAuthenticationCookies(res, accessToken, refreshToken);

      return res.status(200).json({
        success: true,
        user: userData,
        accessToken,
        refreshToken,
        message: 'Login successful'
      });
      
    } catch (error) {
      console.error('❌ Login error:', error);
      return res.status(500).json({
        success: false,
        message: 'Server error during login',
        error: error.message
      });
    }
  }
  
  /**
   * Validate login input data
   * @param {Object} data - Login data to validate
   * @returns {string|null} Error message or null if valid
   */
  static validateLoginInput({ email, password }) {
    if (!email) return 'Email is required';
    if (!password) return 'Password is required';
    
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Please provide a valid email address';
    }
    
    return null;
  }

  /**
   * POST /refresh-token - Refresh JWT token endpoint
   * Validates refresh token and issues new access token
   */
  static async refreshToken(req, res) {
    try {
      console.log('🔄 Starting token refresh process');

      const refreshToken = req.cookies.refreshToken || req.header('X-Refresh-Token') || req.body?.refreshToken;
      
      if (!refreshToken) {
        console.log('❌ Token refresh failed: No refresh token provided');
        return res.status(401).json({
          success: false,
          message: 'Refresh token not found'
        });
      }

      // Verify and decode refresh token
      const decodedToken = jwt.verify(refreshToken, process.env.JWT_SECRET);
      const userId = decodedToken.id;
      
      console.log('🔍 Refresh token verified for user ID:', userId);

      // Find user by ID
      const user = await User.findByPk(userId);
      if (!user) {
        console.log('❌ Token refresh failed: User not found');
        return res.status(401).json({
          success: false,
          message: 'User not found'
        });
      }

      // Check if user account is active
      if (!user.isActive) {
        console.log('❌ Token refresh failed: Account deactivated');
        return res.status(403).json({
          success: false,
          message: 'Account has been deactivated. Please contact an administrator.'
        });
      }

      // Generate new tokens and user data
      const userData = AuthController.createUserDataObject(user);
      const newAccessToken = AuthController.generateAccessToken(userData);
      const newRefreshToken = AuthController.generateRefreshToken(user.id);

      // Update user session
      req.session.userId = user.id;
      req.session.user = userData;
      console.log('🔑 Session updated for user:', userData.email);

      // Set new authentication cookies
      AuthController.setAuthenticationCookies(res, newAccessToken, newRefreshToken);

      return res.status(200).json({
        success: true,
        user: userData,
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        message: 'Token refreshed successfully'
      });
      
    } catch (error) {
      console.error('❌ Token refresh error:', error);
      
      // Clear invalid cookies on error
      res.clearCookie('token', { path: '/' });
      res.clearCookie('refreshToken', { path: '/' });
      
      return res.status(401).json({
        success: false,
        message: 'Invalid refresh token'
      });
    }
  }

  /**
   * POST /logout - User logout endpoint
   * Destroys user session and clears authentication cookies
   */
  static async logout(req, res) {
    try {
      console.log('🚪 Starting user logout process');
      
      // Destroy user session
      req.session.destroy((sessionError) => {
        if (sessionError) {
          console.error('❌ Session destruction error:', sessionError);
          return res.status(500).json({
            success: false,
            message: 'Error during logout'
          });
        }
        
        console.log('✅ Session destroyed successfully');
        
        // Clear all authentication cookies
        const cookieOptions = {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        domain: process.env.MAIN_DOMAIN, // .tutelage.krd
        path: "/"
      };
      
        res.clearCookie('token', cookieOptions);
        res.clearCookie('refreshToken', cookieOptions);
        res.clearCookie('connect.sid', cookieOptions);
        
        console.log('🍪 Authentication cookies cleared');
        
        return res.status(200).json({
          success: true,
          message: 'Logged out successfully'
        });
      });
      
    } catch (error) {
      console.error('❌ Logout error:', error);
      return res.status(500).json({
        success: false,
        message: 'Server error during logout',
        error: error.message
      });
    }
  }

  /**
   * GET /current-user - Get current user information endpoint
   * Returns authenticated user's profile data
   */
  static async getCurrentUser(req, res) {
    try {
      console.log('👤 Retrieving current user information');
      
      // Check authentication via session
      if (!req.session.userId) {
        console.log('❌ User not authenticated');
        return res.status(401).json({
          success: false,
          message: 'Not authenticated'
        });
      }

      // Fetch user from database
      const currentUser = await User.findByPk(req.session.userId);
      if (!currentUser) {
        console.log('❌ User not found in database');
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      console.log('✅ Current user retrieved:', currentUser.email);

      // Create user data object
      const userData = AuthController.createUserDataObject(currentUser);

      return res.status(200).json({
        success: true,
        user: userData
      });
      
    } catch (error) {
      console.error('❌ Get current user error:', error);
      return res.status(500).json({
        success: false,
        message: 'Server error getting user info',
        error: error.message
      });
    }
  }

  // ============================================================================
  // ADMIN USER MANAGEMENT ENDPOINTS
  // ============================================================================
  
  /**
   * GET /users - Get all users endpoint (Admin only)
   * Returns list of all registered users
   */
  static async getAllUsers(req, res) {
    try {
      console.log('👥 Retrieving all users (Admin request)');
      
      const allUsers = await User.findAll({
        attributes: ['id', 'name', 'email', 'role', 'createdAt', 'isActive'],
        order: [['createdAt', 'DESC']]
      });
      
      console.log(`✅ Found ${allUsers.length} users`);

      return res.status(200).json({
        success: true,
        users: allUsers,
        count: allUsers.length
      });
      
    } catch (error) {
      console.error('❌ Get all users error:', error);
      return res.status(500).json({
        success: false,
        message: 'Server error getting users',
        error: error.message
      });
    }
  }

  /**
   * POST /users - Create new user endpoint (Admin only)
   * Creates a new user account with admin privileges
   */
  static async createUser(req, res) {
    try {
      console.log('👤 Creating new user (Admin request)');
      
      const { name, email, password, role = 'ADMIN' } = req.body;
      console.log('📝 User creation request for:', { name, email, role });

      // Input validation
      const validationError = AuthController.validateRegistrationInput({ name, email, password });
      if (validationError) {
        return res.status(400).json({
          success: false,
          message: validationError
        });
      }

      // Check for existing user
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        console.log('❌ User creation failed: Email already exists');
        return res.status(409).json({
          success: false,
          message: 'Email already in use'
        });
      }

      // Hash password and create user
      const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
      const newUser = await User.create({
        name,
        email,
        passwordHash: hashedPassword,
        role
      });
      
      console.log('✅ User created successfully with ID:', newUser.id);

      // Create user data object with creation timestamp
      const userData = {
        ...AuthController.createUserDataObject(newUser),
        createdAt: newUser.createdAt
      };

      return res.status(201).json({
        success: true,
        user: userData,
        message: 'User created successfully'
      });
    } catch (error) {
      console.error('❌ Create user error:', error);
      return res.status(500).json({
        success: false,
        message: 'Server error creating user',
        error: error.message
      });
    }
  }

  /**
   * GET /users/:id - Get user by ID endpoint (Admin only)
   * Returns specific user information by ID
   */
  static async getUserById(req, res) {
    try {
      const { id: userId } = req.params;
      console.log('🔍 Getting user by ID (Admin request)');
      
      if (!userId) {
        return res.status(400).json({
          success: false,
          message: 'User ID is required'
        });
      }

      console.log('📝 Looking for user with ID:', userId);

      const targetUser = await User.findByPk(userId, {
        attributes: ['id', 'name', 'email', 'role', 'createdAt', 'updatedAt']
      });
      
      if (!targetUser) {
        console.log('❌ User not found');
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      console.log('✅ User found:', targetUser.email);

      // Create user data object with timestamps
      const userData = {
        ...AuthController.createUserDataObject(targetUser),
        createdAt: targetUser.createdAt,
        updatedAt: targetUser.updatedAt
      };

      return res.status(200).json({
        success: true,
        user: userData
      });
      
    } catch (error) {
      console.error('❌ Get user by ID error:', error);
      return res.status(500).json({
        success: false,
        message: 'Server error getting user',
        error: error.message
      });
    }
  }

  /**
   * PUT /users/:id - Update user endpoint (Admin only)
   * Updates user information by ID
   */
  static async updateUser(req, res) {
    try {
      const { id: userId } = req.params;
      const { name, email, role, password } = req.body;
      console.log('✏️ Updating user (Admin request)');
      
      if (!userId) {
        return res.status(400).json({
          success: false,
          message: 'User ID is required'
        });
      }

      console.log('📝 Looking for user to update:', userId);

      const targetUser = await User.findByPk(userId);
      if (!targetUser) {
        console.log('❌ User not found');
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      // Prepare update data object
      const updateData = {};
      if (name !== undefined) updateData.name = name;
      if (email !== undefined) updateData.email = email;
      if (role !== undefined) updateData.role = role;

      // Handle password update if provided
      if (password !== undefined && password.trim() !== '') {
        if (password.length < MIN_PASSWORD_LENGTH) {
          return res.status(400).json({
            success: false,
            message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`
          });
        }
        // Hash the new password
        updateData.passwordHash = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
        console.log('🔐 Password updated for user');
      }

      // Validate email uniqueness if email is being updated
      if (email && email !== targetUser.email) {
        const existingUser = await User.findOne({ 
          where: { 
            email,
            id: { [require('sequelize').Op.ne]: userId }
          } 
        });
        if (existingUser) {
          console.log('❌ Email already in use');
          return res.status(409).json({
            success: false,
            message: 'Email already in use by another user'
          });
        }
      }

      console.log('📝 Updating user with data:', Object.keys(updateData).join(', '));

      // Update user record
      await targetUser.update(updateData);
      
      console.log('✅ User updated successfully:', targetUser.email);

      // Create updated user data object with timestamp
      const userData = {
        ...AuthController.createUserDataObject(targetUser),
        updatedAt: targetUser.updatedAt
      };

      return res.status(200).json({
        success: true,
        user: userData,
        message: 'User updated successfully'
      });
      
    } catch (error) {
      console.error('❌ Update user error:', error);
      return res.status(500).json({
        success: false,
        message: 'Server error updating user',
        error: error.message
      });
    }
  }

  /**
   * DELETE /users/:id - Delete user endpoint (Admin only)
   * Deletes a user account by ID
   */
  static async deleteUser(req, res) {
    try {
      const { id: userId } = req.params;
      console.log('🗑️ Deleting user (Admin request)');
      
      if (!userId) {
        return res.status(400).json({
          success: false,
          message: 'User ID is required'
        });
      }

      console.log('🔍 Looking for user to delete:', userId);

      const targetUser = await User.findByPk(userId);
      if (!targetUser) {
        console.log('❌ User not found');
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      console.log('🗑️ Deleting user:', targetUser.email);

      // Delete the user
      await targetUser.destroy();
      
      console.log('✅ User deleted successfully');
      return res.status(200).json({
        success: true,
        message: 'User deleted successfully'
      });
      
    } catch (error) {
      console.error('❌ Delete user error:', error);
      return res.status(500).json({
        success: false,
        message: 'Server error deleting user',
        error: error.message
      });
    }
  }

  /**
   * PATCH /users/:id/deactivate - Deactivate user endpoint (Admin only)
   * Deactivates a user account by setting isActive to false
   */
  static async deactivateUser(req, res) {
    try {
      const { id: userId } = req.params;
      console.log('🔒 Deactivating user (Admin request)');
      
      if (!userId) {
        return res.status(400).json({
          success: false,
          message: 'User ID is required'
        });
      }

      console.log('🔍 Looking for user to deactivate:', userId);

      const targetUser = await User.findByPk(userId);
      if (!targetUser) {
        console.log('❌ User not found');
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      // Check if user is already deactivated
      if (!targetUser.isActive) {
        return res.status(400).json({
          success: false,
          message: 'User is already deactivated'
        });
      }

      console.log('🔒 Deactivating user:', targetUser.email);

      // Deactivate the user
      await targetUser.update({ isActive: false });
      
      console.log('✅ User deactivated successfully');
      return res.status(200).json({
        success: true,
        message: 'User deactivated successfully',
        data: {
          id: targetUser.id,
          email: targetUser.email,
          name: targetUser.name,
          isActive: false
        }
      });
      
    } catch (error) {
      console.error('❌ Deactivate user error:', error);
      return res.status(500).json({
        success: false,
        message: 'Server error deactivating user',
        error: error.message
      });
    }
  }

  /**
   * PATCH /users/:id/activate - Activate user endpoint (Admin only)
   * Activates a user account by setting isActive to true
   */
  static async activateUser(req, res) {
    try {
      const { id: userId } = req.params;
      console.log('🔓 Activating user (Admin request)');
      
      if (!userId) {
        return res.status(400).json({
          success: false,
          message: 'User ID is required'
        });
      }

      console.log('🔍 Looking for user to activate:', userId);

      const targetUser = await User.findByPk(userId);
      if (!targetUser) {
        console.log('❌ User not found');
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      // Check if user is already active
      if (targetUser.isActive) {
        return res.status(400).json({
          success: false,
          message: 'User is already active'
        });
      }

      console.log('🔓 Activating user:', targetUser.email);

      // Activate the user
      await targetUser.update({ isActive: true });
      
      console.log('✅ User activated successfully');
      return res.status(200).json({
        success: true,
        message: 'User activated successfully',
        data: {
          id: targetUser.id,
          email: targetUser.email,
          name: targetUser.name,
          isActive: true
        }
      });
      
    } catch (error) {
      console.error('❌ Activate user error:', error);
      return res.status(500).json({
        success: false,
        message: 'Server error activating user',
        error: error.message
      });
    }
  }
}

module.exports = AuthController;