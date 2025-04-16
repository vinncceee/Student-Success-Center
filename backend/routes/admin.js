const express = require('express');
const router = express.Router();
const {
  getPendingAvailabilities,
  approveAvailability,
  deleteAvailability
} = require('../controllers/adminController');

// Admin Actions
router.get('/availability/pending', getPendingAvailabilities);               // Get all pending availability submissions
router.post('/availability/:availabilityId/approve', approveAvailability);  // Approve a specific availability
router.delete('/availability/:availabilityId', deleteAvailability);         // Delete a specific availability



module.exports = router;
