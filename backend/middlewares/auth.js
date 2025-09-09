const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Middleware to check if user is authenticated
const isAuthenticated = async (req, res, next) => {
  try {
    // Check if user is already in session
    if (req.session && req.session.userId) {
      const user = await User.findByPk(req.session.userId);
      if (user) {
        req.user = user;
        return next();
      }
    }

    // Try to get token from multiple sources
    let token = req.header('Authorization')?.replace('Bearer ', '') ||
                req.cookies.token ||
                req.header('X-Access-Token');
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'Access denied. No token provided.' 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);
    
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid token. User not found.' 
      });
    }

    // Store user in session for future requests
    req.session.userId = user.id;
    req.session.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    req.user = user;
    next();
  } catch (error) {
    // If JWT is expired, try to refresh using refresh token
    if (error.name === 'TokenExpiredError') {
      const refreshToken = req.cookies.refreshToken || req.header('X-Refresh-Token');
      
      if (refreshToken) {
        try {
          const decoded = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET
          );
          
          const user = await User.findByPk(decoded.id);
          if (user) {
            // Generate new token
            const newToken = jwt.sign(
              { id: user.id, email: user.email, role: user.role },
              process.env.JWT_SECRET,
              { expiresIn: '24h' }
            );

            // Set new cookie
            const cookieOptions = {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
              maxAge: 24 * 60 * 60 * 1000
            };

            res.cookie('token', newToken, cookieOptions);
            
            // Update session
            req.session.userId = user.id;
            req.session.user = {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role
            };

            req.user = user;
            return next();
          }
        } catch (refreshError) {
          // Refresh token is also invalid
        }
      }
    }

    return res.status(401).json({ 
      success: false, 
      message: 'Invalid or expired token.' 
    });
  }
};

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  if (req.user && (req.user.role === 'ADMIN' || req.user.role === 'MAIN_MANAGER')) {
    next();
  } else {
    return res.status(403).json({ 
      success: false, 
      message: 'Access denied. Admin privileges required.' 
    });
  }
};

// Middleware to check if user is main manager
const isMainManager = (req, res, next) => {
  if (req.user && req.user.role === 'MAIN_MANAGER') {
    next();
  } else {
    return res.status(403).json({ 
      success: false, 
      message: 'Access denied. Main manager privileges required.' 
    });
  }
};

module.exports = {
  isAuthenticated,
  isAdmin,
  isMainManager
};