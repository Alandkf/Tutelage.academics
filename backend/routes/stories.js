// ============================================================================
// STORY ROUTES
// ============================================================================
// Public GET endpoints and admin-protected POST/PUT/DELETE for story library.

const express = require('express');
const router = express.Router();
const {
  createStory,
  getAllStories,
  getStoryById,
  updateStory,
  deleteStory,
  searchStories
} = require('../controllers/storyController');
const { isAuthenticated, isAdmin } = require('../middlewares/auth');
const { pdfUpload } = require('../middlewares/pdfUpload');

// Public routes
router.get('/', getAllStories);
router.get('/search', searchStories);
router.get('/:id', getStoryById);

// Protected admin routes
router.use(isAuthenticated);
router.post('/', isAdmin, pdfUpload, createStory);
router.put('/:id', isAdmin, pdfUpload, updateStory);
router.delete('/:id', isAdmin, deleteStory);

module.exports = router;