// ============================================================================
// ESL AUDIO ROUTES
// ============================================================================
// Public listing and detail; admin-protected create/update/delete.

const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middlewares/auth');
const adminAuth = require('../middlewares/adminAuth');
const { pdfUpload } = require('../middlewares/pdfUpload');
const {
  createEslAudio,
  getAllEslAudios,
  getEslAudioById,
  updateEslAudio,
  deleteEslAudio,
  searchEslAudioByTranscript
} = require('../controllers/eslAudioController');

// Public endpoints
router.get('/', getAllEslAudios);
router.get('/:id', getEslAudioById);
router.post('/search-transcript', searchEslAudioByTranscript);

// Admin endpoints
router.use(isAuthenticated);
router.post('/', adminAuth, pdfUpload, createEslAudio);
router.put('/:id', adminAuth, pdfUpload, updateEslAudio);
router.delete('/:id', adminAuth, deleteEslAudio);

module.exports = router;