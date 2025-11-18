// ============================================================================
// ESL VIDEO ROUTES
// ============================================================================
// Public listing and detail; admin-protected create/update/delete.

const express = require('express');
const router = express.Router();
const { isAuthenticated, isAdmin } = require('../middlewares/auth');
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
router.post('/', isAdmin, pdfUpload, createEslVideo);
router.put('/:id', isAdmin, pdfUpload, updateEslVideo);
router.delete('/:id', isAdmin, deleteEslVideo);

module.exports = router;