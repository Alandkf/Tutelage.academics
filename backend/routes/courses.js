// ============================================================================
// COURSE ROUTES
// ============================================================================
// This file defines all routes for course CRUD operations with proper
// authentication and authorization middleware.
// ============================================================================

const express = require('express');
const router = express.Router();
const {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  getCoursesByCategory,
  searchCoursesByTitle
} = require('../controllers/courseController');
const { authenticateToken } = require('../middlewares/auth');
const { requireAdmin } = require('../middlewares/adminAuth');

// ============================================================================
// PUBLIC ROUTES (No authentication required)
// ============================================================================

/**
 * GET /api/courses
 * Get all courses with pagination and filtering
 * Query params: page, limit, search, category, sortBy, sortOrder
 */
router.get('/', getAllCourses);

/**
 * GET /api/courses/:id
 * Get a specific course by ID
 */
router.get('/:id', getCourseById);

/**
 * GET /api/courses/category/:category
 * Get courses by category with pagination
 * Query params: page, limit, sortBy, sortOrder
 */
router.get('/category/:category', getCoursesByCategory);

/**
 * GET /api/courses/search/title
 * Search courses by title
 * Query params: query, page, limit, sortBy, sortOrder
 */
router.get('/search/title', searchCoursesByTitle);

// ============================================================================
// PROTECTED ROUTES (Authentication required)
// ============================================================================

/**
 * POST /api/courses
 * Create a new course
 * Requires authentication
 */
router.post('/', authenticateToken, createCourse);

/**
 * PUT /api/courses/:id
 * Update a course
 * Requires authentication (author or admin only)
 */
router.put('/:id', authenticateToken, updateCourse);

/**
 * DELETE /api/courses/:id
 * Delete a course
 * Requires authentication (author or admin only)
 */
router.delete('/:id', authenticateToken, deleteCourse);

// ============================================================================
// ADMIN ROUTES (Admin authentication required)
// ============================================================================

/**
 * POST /api/courses/admin
 * Admin-only course creation (if needed for special cases)
 */
router.post('/admin', authenticateToken, requireAdmin, createCourse);

/**
 * PUT /api/courses/admin/:id
 * Admin-only course update (can update any course)
 */
router.put('/admin/:id', authenticateToken, requireAdmin, updateCourse);

/**
 * DELETE /api/courses/admin/:id
 * Admin-only course deletion (can delete any course)
 */
router.delete('/admin/:id', authenticateToken, requireAdmin, deleteCourse);

module.exports = router;