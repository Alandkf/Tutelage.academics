// ============================================================================
// VIDEO ROUTES
// ============================================================================
// This file defines all routes for video CRUD operations with proper
// authentication and authorization middleware.
// ============================================================================

const express = require('express');
const router = express.Router();
const {
  createVideo,
  getAllVideos,
  getVideoById,
  updateVideo,
  deleteVideo,
  searchVideosByTitle,
  get // Legacy function
} = require('../controllers/videoController');
const { isAuthenticated } = require('../middlewares/auth');
const adminAuth = require('../middlewares/adminAuth');

// ============================================================================
// PUBLIC ROUTES (No authentication required)
// ============================================================================

/**
 * GET /api/videos
 * Get all video content with pagination and filtering
 * Query params: page, limit, search, sortBy, sortOrder
 */
router.get('/', getAllVideos);

/**
 * GET /api/videos/legacy
 * Legacy route for backward compatibility
 */
router.get('/legacy', get);

/**
 * GET /api/videos/:id
 * Get a specific video content by ID
 */
router.get('/:id', getVideoById);

/**
 * GET /api/videos/search/title
 * Search video content by title
 * Query params: query, page, limit
 */
router.get('/search/title', searchVideosByTitle);

// ============================================================================
// PROTECTED ROUTES (Authentication required)
// ============================================================================

/**
 * POST /api/videos
 * Create a new video content
 * Requires authentication
 */
router.post('/', isAuthenticated, createVideo);

/**
 * PUT /api/videos/:id
 * Update a video content
 * Requires authentication (author or admin only)
 */
router.put('/:id', isAuthenticated, updateVideo);

/**
 * DELETE /api/videos/:id
 * Delete a video content
 * Requires authentication (author or admin only)
 */
router.delete('/:id', isAuthenticated, deleteVideo);

// ============================================================================
// ADMIN ROUTES (Admin authentication required)
// ============================================================================

/**
 * POST /api/videos/admin
 * Admin-only video creation (if needed for special cases)
 */
router.post('/admin', isAuthenticated, adminAuth, createVideo);

/**
 * PUT /api/videos/admin/:id
 * Admin-only video update (can update any video)
 */
router.put('/admin/:id', isAuthenticated, adminAuth, updateVideo);

/**
 * DELETE /api/videos/admin/:id
 * Admin-only video deletion (can delete any video)
 */
router.delete('/admin/:id', isAuthenticated, adminAuth, deleteVideo);

module.exports = router;