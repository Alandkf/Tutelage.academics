// ============================================================================
// PUBLIC QUIZ ROUTES
// ============================================================================
// Public routes for fetching quiz configuration and questions (frontend)

const express = require('express');
const router = express.Router();
const {
  getPublicQuizConfig,
  getPublicSections,
  getPublicQuestions
} = require('../controllers/quizController');

// ============================================================================
// PUBLIC ROUTES (No authentication required)
// ============================================================================

/**
 * GET /api/quiz/config
 * Fetch quiz configuration (totalQuestions, timeLimitMinutes)
 */
router.get('/config', getPublicQuizConfig);

/**
 * GET /api/quiz/sections
 * Fetch all active sections with their metadata
 */
router.get('/sections', getPublicSections);

/**
 * GET /api/quiz/questions
 * Fetch all active questions (optionally filtered by section/level)
 */
router.get('/questions', getPublicQuestions);

module.exports = router;
