// ============================================================================
// TEST ROUTES
// ============================================================================
// This file defines all routes for test CRUD operations with proper
// authentication and authorization middleware.
// ============================================================================

const express = require('express');
const router = express.Router();
const {
  createTest,
  getAllTests,
  getTestById,
  updateTest,
  deleteTest,
  searchTestsByTitle,
  getTestsByAuthor
} = require('../controllers/testController');
const { authenticateToken } = require('../middlewares/auth');
const { requireAdmin } = require('../middlewares/adminAuth');

// ============================================================================
// PUBLIC ROUTES (No authentication required)
// ============================================================================

/**
 * GET /api/tests
 * Get all tests with pagination and filtering
 * Query params: page, limit, search, sortBy, sortOrder
 */
router.get('/', getAllTests);

/**
 * GET /api/tests/:id
 * Get a specific test by ID with questions and results
 */
router.get('/:id', getTestById);

/**
 * GET /api/tests/search/title
 * Search tests by title
 * Query params: query, page, limit, sortBy, sortOrder
 */
router.get('/search/title', searchTestsByTitle);

/**
 * GET /api/tests/author/:authorId
 * Get tests by author with pagination
 * Query params: page, limit, sortBy, sortOrder
 */
router.get('/author/:authorId', getTestsByAuthor);

// ============================================================================
// PROTECTED ROUTES (Authentication required)
// ============================================================================

/**
 * POST /api/tests
 * Create a new test
 * Requires authentication
 */
router.post('/', authenticateToken, createTest);

/**
 * PUT /api/tests/:id
 * Update a test
 * Requires authentication (author or admin only)
 */
router.put('/:id', authenticateToken, updateTest);

/**
 * DELETE /api/tests/:id
 * Delete a test
 * Requires authentication (author or admin only)
 */
router.delete('/:id', authenticateToken, deleteTest);

// ============================================================================
// ADMIN ROUTES (Admin authentication required)
// ============================================================================

/**
 * POST /api/tests/admin
 * Admin-only test creation (if needed for special cases)
 */
router.post('/admin', authenticateToken, requireAdmin, createTest);

/**
 * PUT /api/tests/admin/:id
 * Admin-only test update (can update any test)
 */
router.put('/admin/:id', authenticateToken, requireAdmin, updateTest);

/**
 * DELETE /api/tests/admin/:id
 * Admin-only test deletion (can delete any test)
 */
router.delete('/admin/:id', authenticateToken, requireAdmin, deleteTest);

module.exports = router;