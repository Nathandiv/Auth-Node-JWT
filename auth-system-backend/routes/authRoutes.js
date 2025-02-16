// routes/authRoutes.js
const express = require('express');
const { register, login } = require('../controllers/authController');
const authenticateJWT = require('../Middleware/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authenticateJWT, (req, res) => {
  res.json({ message: 'Profile data', user: req.user });
});

// Route to update user's admin status with authentication
router.get('/dashboard', authenticateJWT, (req, res) => {
  res.json({ message: 'Welcome to the user dashboard' });
});


module.exports = router;

