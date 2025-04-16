const express = require('express');
const router = express.Router();
const {
  createUser,
  getUserById,
  getUserByEmail,
  getAllUsers,
  updateUser,
  deleteUser,
  verifyIdNumber,
  updateRole
} = require('../controllers/userController');
const handlers = require("../controllers/userController");
console.log("controller keys:", Object.keys(handlers));
// User Management
router.post('/', createUser);                      // Create new user
router.get('/', getAllUsers);                      // Get all users or filter by ?email=
router.get('/email/:email', getUserByEmail);       // Get user by email
router.get('/:userId', getUserById);               // Get user by ID
router.put('/:userId', updateUser);                // Update user
router.delete('/:userId', deleteUser);             // Delete user
router.patch('/:idNumber/role', updateRole);

// router.post('/verify-id', verifyIdNumber);       // (Probably not needed)

module.exports = router;
