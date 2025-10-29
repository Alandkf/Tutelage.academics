// ============================================================================
// ANALYTICS ROUTES
// ============================================================================
// Public endpoints for logging and fetching resource analytics.

const express = require('express');
const router = express.Router();
const { logEvent, getMetrics, getTop } = require('../controllers/analyticsController');

// Log events (public to allow client-side logging without auth)
router.post('/log', logEvent);

// Get metrics for a specific resource
router.get('/:resourceType/:resourceId', getMetrics);

// Get top resources by views
router.get('/top', getTop);

module.exports = router;