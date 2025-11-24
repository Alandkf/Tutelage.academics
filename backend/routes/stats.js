// ============================================================================
// STATS ROUTES
// ============================================================================
// Routes for dashboard statistics and analytics

const express = require('express');
const router = express.Router();
const { getDashboardStats, getDetailedStats } = require('../controllers/statsController');
const { isAuthenticated } = require('../middlewares/auth');
const adminAuth = require('../middlewares/adminAuth');

/**
 * GET /api/stats
 * Get basic dashboard statistics
 * Requires admin authentication
 */
router.get('/', isAuthenticated, getDashboardStats);

/**
 * GET /api/stats/detailed
 * Get detailed statistics with additional metrics
 * Requires admin authentication
 */
router.get('/detailed', isAuthenticated, adminAuth, getDetailedStats);

module.exports = router;
