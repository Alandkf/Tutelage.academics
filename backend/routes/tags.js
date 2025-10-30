// ============================================================================
// TAG ROUTES
// ============================================================================
// Public endpoints to read tags; admin-protected seeding endpoint.

const express = require('express');
const router = express.Router();
const { getAllTags, getByNamespace, seedDefaultTags } = require('../controllers/tagController');
const { isAuthenticated } = require('../middlewares/auth');
const adminAuth = require('../middlewares/adminAuth');

// Public routes
router.get('/', getAllTags);
router.get('/namespace/:namespace', getByNamespace);

// Protected admin route
router.use(isAuthenticated);
router.post('/seed', adminAuth, seedDefaultTags);

module.exports = router;