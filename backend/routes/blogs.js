// ============================================================================
// ============================================================================
// BLOG ROUTES
// ============================================================================
// This file defines all routes for blog CRUD operations with proper
// authentication and authorization middleware.
// ============================================================================

const express = require('express');
const router = express.Router();
const {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  getBlogsByCategory
} = require('../controllers/blogController');
const { authenticateToken } = require('../middlewares/auth');
const { requireAdmin } = require('../middlewares/adminAuth');

// ============================================================================
// PUBLIC ROUTES (No authentication required)
// ============================================================================

/**
 * GET /api/blogs
 * Get all blog posts with pagination and filtering
 * Query params: page, limit, category, search, sortBy, sortOrder
 */
router.get('/', getAllBlogs);

/**
 * GET /api/blogs/:id
 * Get a specific blog post by ID
 */
router.get('/:id', getBlogById);

/**
 * GET /api/blogs/category/:category
 * Get blog posts by category with pagination
 */
router.get('/category/:category', getBlogsByCategory);

// ============================================================================
// PROTECTED ROUTES (Authentication required)
// ============================================================================

/**
 * POST /api/blogs
 * Create a new blog post
 * Requires authentication
 */
router.post('/', authenticateToken, createBlog);

/**
 * PUT /api/blogs/:id
 * Update a blog post
 * Requires authentication (author or admin only)
 */
router.put('/:id', authenticateToken, updateBlog);

/**
 * DELETE /api/blogs/:id
 * Delete a blog post
 * Requires authentication (author or admin only)
 */
router.delete('/:id', authenticateToken, deleteBlog);

// ============================================================================
// ADMIN ROUTES (Admin authentication required)
// ============================================================================

/**
 * POST /api/blogs/admin
 * Admin-only blog creation (if needed for special cases)
 */
router.post('/admin', authenticateToken, requireAdmin, createBlog);

/**
 * PUT /api/blogs/admin/:id
 * Admin-only blog update (can update any blog)
 */
router.put('/admin/:id', authenticateToken, requireAdmin, updateBlog);

/**
 * DELETE /api/blogs/admin/:id
 * Admin-only blog deletion (can delete any blog)
 */
router.delete('/admin/:id', authenticateToken, requireAdmin, deleteBlog);

module.exports = router;