const express = require('express');
const router = express.Router();
const {
  getAllStudents,
  getStudentById,
  getStudentBookings,
  updateStudent,
  deleteStudent
} = require('../controllers/studentController');

// Student Bookings
router.get('/:studentId/bookings', getStudentBookings);

// Student Profile Management
router.get('/', getAllStudents);            // Get all students
router.get('/:studentId', getStudentById);  // Get student by ID
router.patch('/:studentId', updateStudent); // Update student info
router.delete('/:studentId', deleteStudent); // Delete student

module.exports = router;
