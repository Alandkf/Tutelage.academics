// ============================================================================
// BLOG ROUTES
// ============================================================================
// This file defines all blog-related routes including blog retrieval,
// creation, updating, and deletion operations.
// ============================================================================

// ============================================================================
// DEPENDENCIES
// ============================================================================
const express = require('express');
const router = express.Router();

// ============================================================================
// MODELS
// ============================================================================
const { Blog } = require('../models');

// ============================================================================
// BLOG RETRIEVAL ROUTES
// ============================================================================

/**
 * GET /api/blogs
 * Retrieve all blogs ordered by creation date (newest first)
 * @returns {Object} JSON response with success status and blog data
 */
router.get('/', async (req, res) => {
  try {
    // Fetch all blogs ordered by creation date (newest first)
    const blogList = await Blog.findAll({
      order: [['createdAt', 'DESC']]
    });
    
    console.log(`Successfully fetched ${blogList.length} blogs`);
    
    // Return successful response with blog data
    res.json({
      success: true,
      count: blogList.length,
      data: blogList
    });
  } catch (error) {
    console.error('Error fetching blogs:', error.message);
    
    // Return error response
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blogs',
      error: error.message
    });
  }
});

// ============================================================================
// EXPORTS
// ============================================================================
module.exports = router;