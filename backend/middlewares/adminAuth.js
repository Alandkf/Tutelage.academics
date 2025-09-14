const adminAuth = (req, res, next) => {
  try {
    // Check if user is authenticated
    if (!req.user) {
      console.log('❌ Admin middleware: User not authenticated');
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    // Check if user has admin role
    if (req.user.role !== 'ADMIN') {
      console.log(`❌ Admin middleware: User ${req.user.email} attempted admin access with role: ${req.user.role}`);
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin privileges required.'
      });
    }

    console.log(`✅ Admin middleware: Admin ${req.user.email} authorized`);
    next();
  } catch (error) {
    console.error('❌ Admin middleware error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error in admin authorization',
      error: error.message
    });
  }
};

module.exports = adminAuth;