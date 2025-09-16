// ============================================================================
// AUTHENTICATION MIDDLEWARE
// ============================================================================
// This file contains middleware functions for handling user authentication,
// authorization, and role-based access control throughout the application.
// ============================================================================

// ============================================================================
// DEPENDENCIES
// ============================================================================
const jwt = require('jsonwebtoken');
const { User } = require('../models');

// ============================================================================
// CONSTANTS
// ============================================================================
const TOKEN_EXPIRY = '24h';
const COOKIE_MAX_AGE = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Extract token from various request sources
 * @param {Object} req - Express request object
 * @returns {string|null} - JWT token or null if not found
 */
const extractToken = (req) => {
  return req.header('Authorization')?.replace('Bearer ', '') ||
         req.cookies.token ||
         req.header('X-Access-Token') ||
         null;
};

/**
 * Generate cookie options for JWT tokens
 * @returns {Object} - Cookie configuration object
 */
const getCookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  maxAge: COOKIE_MAX_AGE
});

/**
 * Create session data for authenticated user
 * @param {Object} user - User database object
 * @returns {Object} - Session user data
 */
const createSessionData = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role
});

/**
 * Generate new JWT token for user
 * @param {Object} user - User database object
 * @returns {string} - JWT token
 */
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: TOKEN_EXPIRY }
  );
};

// ============================================================================
// AUTHENTICATION MIDDLEWARE
// ============================================================================

/**
 * Middleware to verify user authentication
 * Checks session first, then JWT tokens, with automatic refresh capability
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const isAuthenticated = async (req, res, next) => {
  try {
    // Check if user is already authenticated via session
    if (req.session?.userId) {
      const sessionUser = await User.findByPk(req.session.userId);
      if (sessionUser) {
        req.user = sessionUser;
        return next();
      }
    }

    // Extract token from request
    const accessToken = extractToken(req);
    
    if (!accessToken) {
      return res.status(401).json({ 
        success: false, 
        message: 'Access denied. No token provided.' 
      });
    }

    // Verify and decode the access token
    const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET);
    const authenticatedUser = await User.findByPk(decodedToken.id);
    
    if (!authenticatedUser) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid token. User not found.' 
      });
    }

    // Store user data in session and request object
    req.session.userId = authenticatedUser.id;
    req.session.user = createSessionData(authenticatedUser);
    req.user = authenticatedUser;
    
    next();
  } catch (authError) {
    // Handle token expiration with automatic refresh
    if (authError.name === 'TokenExpiredError') {
      const refreshToken = req.cookies.refreshToken || req.header('X-Refresh-Token');
      
      if (refreshToken) {
        try {
          // Verify refresh token
          const decodedRefreshToken = jwt.verify(refreshToken, process.env.JWT_SECRET);
          const refreshUser = await User.findByPk(decodedRefreshToken.id);
          
          if (refreshUser) {
            // Generate new access token
            const newAccessToken = generateToken(refreshUser);
            
            // Set new token cookie
            res.cookie('token', newAccessToken, getCookieOptions());
            
            // Update session data
            req.session.userId = refreshUser.id;
            req.session.user = createSessionData(refreshUser);
            req.user = refreshUser;
            
            return next();
          }
        } catch (refreshError) {
          // Refresh token is also invalid - fall through to error response
        }
      }
    }

    // Return authentication error
    return res.status(401).json({ 
      success: false, 
      message: 'Invalid or expired token.' 
    });
  }
};

// ============================================================================
// AUTHORIZATION MIDDLEWARE
// ============================================================================

/**
 * Middleware to verify admin privileges
 * Allows both ADMIN and MAIN_MANAGER roles
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const isAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ 
      success: false, 
      message: 'Authentication required.' 
    });
  }

  const hasAdminPrivileges = req.user.role === 'ADMIN' || req.user.role === 'MAIN_MANAGER';
  
  if (hasAdminPrivileges) {
    return next();
  }
  
  return res.status(403).json({ 
    success: false, 
    message: 'Access denied. Admin privileges required.' 
  });
};

/**
 * Middleware to verify main manager privileges
 * Only allows MAIN_MANAGER role
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const isMainManager = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ 
      success: false, 
      message: 'Authentication required.' 
    });
  }

  if (req.user.role === 'MAIN_MANAGER') {
    return next();
  }
  
  return res.status(403).json({ 
    success: false, 
    message: 'Access denied. Main manager privileges required.' 
  });
};

// ============================================================================
// EXPORTS
// ============================================================================
module.exports = {
  isAuthenticated,
  isAdmin,
  isMainManager
};