// ============================================================================
// ENROLLMENT ROUTES
// ============================================================================
// Routes for handling course enrollment form submissions

const express = require('express');
const router = express.Router();
const { processEnrollment, processPricingRequest, processTestResult } = require('../controllers/enrollmentController');

// ============================================================================
// PUBLIC ROUTES (No authentication required for enrollment)
// ============================================================================


/**
 * POST /api/enrollment
 * Submit course enrollment application
 * Body: { name, email, phone, age, education, course }
 */
router.post('/', processEnrollment);

/**
 * POST /api/enrollment/pricing
 * Submit pricing request for courses
 * Body: { firstName, lastName, email, course }
 */
router.post('/pricing', processPricingRequest);

/**
 * POST /api/enrollment/testresult
 * Submit test result and send email to user
 * Body: { firstName, lastName, email, phone, country, yearOfBirth, score, level, totalQuestions, correctAnswers }
 */
router.post('/testresult', processTestResult);


module.exports = router;
