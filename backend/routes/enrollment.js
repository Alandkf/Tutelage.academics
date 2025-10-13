// ============================================================================
// ENROLLMENT ROUTES
// ============================================================================
// Routes for handling course enrollment form submissions

const express = require('express');
const router = express.Router();
const { processEnrollment, processPricingRequest } = require('../controllers/enrollmentController');

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

module.exports = router;
