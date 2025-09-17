// ============================================================================
// ADMIN AUTHENTICATION MIDDLEWARE
// ============================================================================
// This middleware provides strict admin-only authentication, requiring
// users to have the 'ADMIN' role specifically (excludes MAIN_MANAGER).
// ============================================================================

/**
 * Middleware to verify strict admin privileges
 * Only allows users with 'ADMIN' role (excludes MAIN_MANAGER)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const adminAuth = (req, res, next) => {
  try {
    // Verify user authentication
    if (!req.user) {
      console.log('❌ Admin Auth: User not authenticated');
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    // Verify admin role (strict ADMIN only)
    if (req.user.role !== 'ADMIN') {
      console.log(`❌ Admin Auth: User ${req.user.email} denied access (Role: ${req.user.role})`);
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin privileges required.'
      });
    }

    console.log(`✅ Admin Auth: Admin ${req.user.email} authorized`);
    next();
  } catch (authError) {
    console.error('❌ Admin Auth Error:', authError);
    return res.status(500).json({
      success: false,
      message: 'Server error in admin authorization',
      error: authError.message
    });
  }
};

// ============================================================================
// EXPORTS
// ============================================================================
module.exports = adminAuth;