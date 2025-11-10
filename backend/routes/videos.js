// ============================================================================
// VIDEO ROUTES
// ============================================================================
// This file defines all routes for video CRUD operations with proper
// authentication and authorization middleware.
// ============================================================================

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const {
  createVideo,
  getAllVideos,
  getPaginatedVideos,
  getVideoById,
  updateVideo,
  deleteVideo,
  searchVideosByTitle,
  get // Legacy function
} = require('../controllers/videoController');
const { isAuthenticated } = require('../middlewares/auth');
const adminAuth = require('../middlewares/adminAuth');

// ============================================================================
// FILE UPLOAD CONFIGURATION
// ============================================================================

// Ensure upload directory exists
const uploadDir = path.join(__dirname, '..', 'uploads', 'videos');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  },
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// ============================================================================
// PUBLIC ROUTES (No authentication required)
// ============================================================================

/**
 * GET /api/videos
 * Get all video content with infinite scroll pagination and filtering
 * Query params: cursor, limit, search, sortBy, sortOrder
 */
router.get('/', getAllVideos);

/**
 * GET /api/videos/paginated
 * Get all video content with page-based pagination (for React frontend)
 * Query params: page, limit, search, sortBy, sortOrder
 */
router.get('/paginated', getPaginatedVideos);

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
 * Create a new video content with file uploads
 */
router.post('/', isAuthenticated, upload.fields([
  { name: 'pdf', maxCount: 1 },
  { name: 'taskPdf', maxCount: 1 }
]), createVideo);

/**
 * PUT /api/videos/:id
 * Update a video content with file uploads
 */
router.put('/:id', isAuthenticated, upload.fields([
  { name: 'pdf', maxCount: 1 },
  { name: 'taskPdf', maxCount: 1 }
]), updateVideo);

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
 * Admin-only video creation
 */
router.post('/admin', isAuthenticated, adminAuth, upload.fields([
  { name: 'pdf', maxCount: 1 },
  { name: 'taskPdf', maxCount: 1 }
]), createVideo);

/**
 * PUT /api/videos/admin/:id
 * Admin-only video update
 */
router.put('/admin/:id', isAuthenticated, adminAuth, upload.fields([
  { name: 'pdf', maxCount: 1 },
  { name: 'taskPdf', maxCount: 1 }
]), updateVideo);

/**
 * DELETE /api/videos/admin/:id
 * Admin-only video deletion (can delete any video)
 */
router.delete('/admin/:id', isAuthenticated, adminAuth, deleteVideo);

module.exports = router;