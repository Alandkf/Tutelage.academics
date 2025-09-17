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
const { isAuthenticated } = require('../middlewares/auth');
const adminAuth = require('../middlewares/adminAuth');

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
router.post('/', isAuthenticated, createTest);

/**
 * PUT /api/tests/:id
 * Update a test
 * Requires authentication (author or admin only)
 */
router.put('/:id', isAuthenticated, updateTest);

/**
 * DELETE /api/tests/:id
 * Delete a test
 * Requires authentication (author or admin only)
 */
router.delete('/:id', isAuthenticated, deleteTest);

// ============================================================================
// ADMIN ROUTES (Admin authentication required)
// ============================================================================

/**
 * POST /api/tests/admin
 * Create a new test (admin only)
 * Requires admin authentication
 */
router.post('/admin', isAuthenticated, adminAuth, createTest);

/**
 * PUT /api/tests/admin/:id
 * Update any test (admin only)
 * Requires admin authentication
 */
router.put('/admin/:id', isAuthenticated, adminAuth, updateTest);

/**
 * DELETE /api/tests/admin/:id
 * Delete any test (admin only)
 * Requires admin authentication
 */
router.delete('/admin/:id', isAuthenticated, adminAuth, deleteTest);

module.exports = router;