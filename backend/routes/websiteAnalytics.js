// ============================================================================
// WEBSITE ANALYTICS ROUTES
// ============================================================================
// Endpoints for fetching Google Analytics data for the admin dashboard

const express = require('express');
const router = express.Router();
const {
  getWebsiteStats,
  getDailyStats,
  getTopPages,
  getDeviceStats,
  getCountryStats
} = require('../controllers/websiteAnalyticsController');

// Get overall website statistics
router.get('/website-stats', getWebsiteStats);

// Get daily statistics for charts (query param: ?days=7)
router.get('/daily-stats', getDailyStats);

// Get top pages by views (query param: ?limit=5)
router.get('/top-pages', getTopPages);

// Get device breakdown
router.get('/device-stats', getDeviceStats);

// Get top countries (query param: ?limit=5)
router.get('/country-stats', getCountryStats);

module.exports = router;
