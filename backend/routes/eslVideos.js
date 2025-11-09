// ============================================================================
// ESL VIDEO ROUTES
// ============================================================================
// Public listing and detail; admin-protected create/update/delete.

const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middlewares/auth');
const adminAuth = require('../middlewares/adminAuth');
const { pdfUpload } = require('../middlewares/pdfUpload');
const {
  createEslVideo,
  getAllEslVideos,
  getEslVideoById,
  updateEslVideo,
  deleteEslVideo
} = require('../controllers/eslVideoController');

// Public endpoints
router.get('/', getAllEslVideos);
router.get('/:id', getEslVideoById);

// Admin endpoints
router.use(isAuthenticated);
router.post('/', adminAuth, pdfUpload, createEslVideo);
router.put('/:id', adminAuth, pdfUpload, updateEslVideo);
router.delete('/:id', adminAuth, deleteEslVideo);

module.exports = router;