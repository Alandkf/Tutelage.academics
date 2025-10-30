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

// Public routes
router.get('/', getAllStories);
router.get('/search', searchStories);
router.get('/:id', getStoryById);

// Protected admin routes
router.use(isAuthenticated);
router.post('/', adminAuth, createStory);
router.put('/:id', adminAuth, updateStory);
router.delete('/:id', adminAuth, deleteStory);

module.exports = router;