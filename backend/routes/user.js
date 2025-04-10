const express = require('express');
const router = express.Router();
const {
  createUser,
  getUserById,
  getUserByEmail,
  getAllUsers,
  updateUser,
  deleteUser,
  verifyIdNumber
} = require('../controllers/userController');

// User Management
router.post('/', createUser);                      // Create new user
router.get('/', getAllUsers);                      // Get all users or filter by ?email=
router.get('/email/:email', getUserByEmail);       // Get user by email
router.get('/:userId', getUserById);               // Get user by ID
router.put('/:userId', updateUser);                // Update user
router.delete('/:userId', deleteUser);             // Delete user

// router.post('/verify-id', verifyIdNumber);       // (Probably not needed)

module.exports = router;
