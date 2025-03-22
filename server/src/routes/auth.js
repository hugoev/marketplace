const express = require('express');
const router = express.Router();
const { register, login, validate, logout } = require('../controllers/auth');
const { authenticateToken } = require('../middleware/auth');

// Public routes - should NOT have authenticateToken middleware
router.post('/login', login);
router.post('/register', register);

// Protected routes - should have authenticateToken middleware
router.get('/validate', authenticateToken, validate);
router.post('/logout', authenticateToken, logout);

module.exports = router; 