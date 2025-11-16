const express = require('express');
const router = express.Router();

const { isAuthenticated } = require('../middlewares/auth');
const adminAuth = require('../middlewares/adminAuth');
const approvalController = require('../controllers/approvalController');

// All approval endpoints require authentication and strict admin privileges
router.use(isAuthenticated);
router.use(adminAuth);

// List approvals (default: pending)
router.get('/', approvalController.listApprovals);

// Get approval by ID
router.get('/:id', approvalController.getApprovalById);

// Approve a request
router.post('/:id/approve', approvalController.approve);

// Reject a request
router.post('/:id/reject', approvalController.reject);

module.exports = router;