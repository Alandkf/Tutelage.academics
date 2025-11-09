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
const { isAuthenticated } = require('../middlewares/auth');
const adminAuth = require('../middlewares/adminAuth');
const { pdfUpload } = require('../middlewares/pdfUpload');

// Public routes
router.get('/', getAllStories);
router.get('/search', searchStories);
router.get('/:id', getStoryById);

// Protected admin routes
router.use(isAuthenticated);
router.post('/', adminAuth, pdfUpload, createStory);
router.put('/:id', adminAuth, pdfUpload, updateStory);
router.delete('/:id', adminAuth, deleteStory);

module.exports = router;