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
const { isAuthenticated } = require('../middlewares/auth');
const adminAuth = require('../middlewares/adminAuth');

// Public routes
router.get('/', getAllLandingSections);
router.get('/latest', getLatestLandingSection);
router.get('/:id', getLandingSectionById);

// Protected admin routes
router.use(isAuthenticated);
router.post('/', adminAuth, createLandingSection);
router.put('/:id', adminAuth, updateLandingSection);
router.delete('/:id', adminAuth, deleteLandingSection);

module.exports = router;