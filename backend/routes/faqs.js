// ============================================================================
// FAQ ROUTES
// ============================================================================
// This file defines all routes for FAQ CRUD operations with proper
// authentication and authorization middleware.
// ============================================================================

const express = require('express');
const router = express.Router();
const {
  createFaq,
  getAllFaqs,
  getFaqById,
  updateFaq,
  deleteFaq,
  getFaqsByCategory,
  searchFaqsByQuestion,
  getFaqCategories
} = require('../controllers/faqController');
const { authenticateToken } = require('../middlewares/auth');
const { requireAdmin } = require('../middlewares/adminAuth');

// ============================================================================
// PUBLIC ROUTES (No authentication required)
// ============================================================================

/**
 * GET /api/faqs
 * Get all FAQs with pagination and filtering
 * Query params: page, limit, search, category, sortBy, sortOrder
 */
router.get('/', getAllFaqs);

/**
 * GET /api/faqs/:id
 * Get a specific FAQ by ID
 */
router.get('/:id', getFaqById);

/**
 * GET /api/faqs/category/:category
 * Get FAQs by category with pagination
 * Query params: page, limit, sortBy, sortOrder
 */
router.get('/category/:category', getFaqsByCategory);

/**
 * GET /api/faqs/search/question
 * Search FAQs by question
 * Query params: query, page, limit, sortBy, sortOrder
 */
router.get('/search/question', searchFaqsByQuestion);

/**
 * GET /api/faqs/categories/all
 * Get all unique FAQ categories
 */
router.get('/categories/all', getFaqCategories);

// ============================================================================
// ADMIN ROUTES (Admin authentication required)
// ============================================================================
// Note: FAQs are typically managed by admins only

/**
 * POST /api/faqs
 * Create a new FAQ
 * Requires admin authentication
 */
router.post('/', authenticateToken, requireAdmin, createFaq);

/**
 * PUT /api/faqs/:id
 * Update a FAQ
 * Requires admin authentication
 */
router.put('/:id', authenticateToken, requireAdmin, updateFaq);

/**
 * DELETE /api/faqs/:id
 * Delete a FAQ
 * Requires admin authentication
 */
router.delete('/:id', authenticateToken, requireAdmin, deleteFaq);

// ============================================================================
// PROTECTED ROUTES (Authentication required - for future use)
// ============================================================================
// These routes can be used if regular users need to suggest FAQs

/**
 * POST /api/faqs/suggest
 * Suggest a new FAQ (for authenticated users)
 * This could be used for user-submitted FAQ suggestions
 */
router.post('/suggest', authenticateToken, createFaq);

module.exports = router;