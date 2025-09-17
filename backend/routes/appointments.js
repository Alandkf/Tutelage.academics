// ============================================================================
// APPOINTMENT ROUTES
// ============================================================================
// This file defines all routes for appointment CRUD operations with proper
// authentication and authorization middleware.
// ============================================================================

const express = require('express');
const router = express.Router();
const {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
  getAppointmentsByStatus,
  searchAppointmentsByName,
  getAppointmentStats
} = require('../controllers/appointmentController');
const { isAuthenticated } = require('../middlewares/auth');
const adminAuth = require('../middlewares/adminAuth');

// ============================================================================
// PUBLIC ROUTES (No authentication required)
// ============================================================================

/**
 * POST /api/appointments
 * Create a new appointment (public - anyone can book an appointment)
 */
router.post('/', createAppointment);

// ============================================================================
// ADMIN ROUTES (Admin authentication required)
// ============================================================================
// Note: Appointment management is typically restricted to admins

/**
 * GET /api/appointments
 * Get all appointments with pagination and filtering
 * Query params: page, limit, search, status, country, sortBy, sortOrder
 * Requires admin authentication
 */
router.get('/', isAuthenticated, adminAuth, getAllAppointments);

/**
 * GET /api/appointments/stats
 * Get appointment statistics (count by status)
 * Requires admin authentication
 */
router.get('/stats', isAuthenticated, adminAuth, getAppointmentStats);

/**
 * GET /api/appointments/status/:status
 * Get appointments by status with pagination
 * Query params: page, limit, sortBy, sortOrder
 * Requires admin authentication
 */
router.get('/status/:status', isAuthenticated, adminAuth, getAppointmentsByStatus);

/**
 * GET /api/appointments/search/name
 * Search appointments by first name or last name
 * Query params: query, page, limit, sortBy, sortOrder
 * Requires admin authentication
 */
router.get('/search/name', isAuthenticated, adminAuth, searchAppointmentsByName);

/**
 * GET /api/appointments/:id
 * Get a specific appointment by ID
 * Requires admin authentication
 */
router.get('/:id', isAuthenticated, adminAuth, getAppointmentById);

/**
 * PUT /api/appointments/:id
 * Update an appointment
 * Requires admin authentication
 */
router.put('/:id', isAuthenticated, adminAuth, updateAppointment);

/**
 * DELETE /api/appointments/:id
 * Delete an appointment
 * Requires admin authentication
 */
router.delete('/:id', isAuthenticated, adminAuth, deleteAppointment);

// ============================================================================
// PROTECTED ROUTES (Authentication required - for future use)
// ============================================================================
// These routes can be used if users need to manage their own appointments

/**
 * GET /api/appointments/my/appointments
 * Get current user's appointments (for future implementation with user association)
 * Requires authentication
 */
// router.get('/my/appointments', authenticateToken, getUserAppointments);

/**
 * PUT /api/appointments/my/:id
 * Update current user's appointment (for future implementation with user association)
 * Requires authentication
 */
// router.put('/my/:id', authenticateToken, updateUserAppointment);

/**
 * DELETE /api/appointments/my/:id
 * Cancel current user's appointment (for future implementation with user association)
 * Requires authentication
 */
// router.delete('/my/:id', authenticateToken, cancelUserAppointment);

module.exports = router;