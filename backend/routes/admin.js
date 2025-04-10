const express = require('express');
const router = express.Router();
const {
  getPendingAvailabilities,
  approveAvailability
} = require('../controllers/adminController');

// Admin Actions
router.get('/availability/pending', getPendingAvailabilities);               // Get all pending availability submissions
router.post('/availability/:availabilityId/approve', approveAvailability);  // Approve a specific availability

module.exports = router;
