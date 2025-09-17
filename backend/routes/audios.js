// ============================================================================
// AUDIO ROUTES
// ============================================================================
// This file defines all routes for audio CRUD operations with proper
// authentication and authorization middleware.
// ============================================================================

const express = require('express');
const router = express.Router();
const {
  createAudio,
  getAllAudios,
  getAudioById,
  updateAudio,
  deleteAudio,
  searchAudioByTranscript
} = require('../controllers/audioController');
const { isAuthenticated } = require('../middlewares/auth');
const adminAuth = require('../middlewares/adminAuth');

// ============================================================================
// PUBLIC ROUTES (No authentication required)
// ============================================================================

/**
 * GET /api/audios
 * Get all audio content with pagination and filtering
 * Query params: page, limit, search, sortBy, sortOrder
 */
router.get('/', getAllAudios);

/**
 * GET /api/audios/:id
 * Get a specific audio content by ID
 */
router.get('/:id', getAudioById);

/**
 * GET /api/audios/search/transcript
 * Search audio content by transcript
 * Query params: query, page, limit
 */
router.get('/search/transcript', searchAudioByTranscript);

// ============================================================================
// PROTECTED ROUTES (Authentication required)
// ============================================================================

/**
 * POST /api/audios
 * Create a new audio content
 * Requires authentication
 */
router.post('/', isAuthenticated, createAudio);

/**
 * PUT /api/audios/:id
 * Update an audio content
 * Requires authentication (author or admin only)
 */
router.put('/:id', isAuthenticated, updateAudio);

/**
 * DELETE /api/audios/:id
 * Delete an audio content
 * Requires authentication (author or admin only)
 */
router.delete('/:id', isAuthenticated, deleteAudio);

// ============================================================================
// ADMIN ROUTES (Admin authentication required)
// ============================================================================

/**
 * POST /api/audios/admin
 * Admin-only audio creation (if needed for special cases)
 */
router.post('/admin', isAuthenticated, adminAuth, createAudio);

/**
 * PUT /api/audios/admin/:id
 * Admin-only audio update (can update any audio)
 */
router.put('/admin/:id', isAuthenticated, adminAuth, updateAudio);

/**
 * DELETE /api/audios/admin/:id
 * Admin-only audio deletion (can delete any audio)
 */
router.delete('/admin/:id', isAuthenticated, adminAuth, deleteAudio);

module.exports = router;