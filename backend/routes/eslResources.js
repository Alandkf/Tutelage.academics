// ============================================================================
// ESL RESOURCES ROUTES
// ============================================================================
// Public routes for mixed ESL resource queries

const express = require('express');
const router = express.Router();
const { getDailyFeatured } = require('../controllers/eslResourcesController');

/**
 * GET /api/esl-resources/daily-featured
 * Get 12 daily-rotating featured resources (3 from each type: blogs, stories, videos, audios)
 * Changes every 24 hours based on date seed
 */
router.get('/daily-featured', getDailyFeatured);

module.exports = router;
