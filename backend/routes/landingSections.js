// ============================================================================
// LANDING SECTION ROUTES
// ============================================================================
// Public GET endpoints and admin-protected POST/PUT/DELETE for landing section.
// ============================================================================

const express = require('express');
const router = express.Router();
const {
  createLandingSection,
  getLatestLandingSection,
  getAllLandingSections,
  getLandingSectionById,
  updateLandingSection,
  deleteLandingSection
} = require('../controllers/landingSectionController');
const { isAuthenticated, isAdmin } = require('../middlewares/auth');

// Public routes
router.get('/', getAllLandingSections);
router.get('/latest', getLatestLandingSection);
router.get('/:id', getLandingSectionById);

// Protected admin routes
router.use(isAuthenticated);
router.post('/', isAdmin, createLandingSection);
router.put('/:id', isAdmin, updateLandingSection);
router.delete('/:id', isAdmin, deleteLandingSection);

module.exports = router;