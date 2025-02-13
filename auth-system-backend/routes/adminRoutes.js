// routes/adminRoutes.js
const express = require('express');
const isAdmin = require('../Middleware/roleMiddleware');
const router = express.Router();

// Example of a protected route
router.get('/admin-dashboard', isAdmin, (req, res) => {
  res.json({ message: 'Welcome to the admin dashboard' });
});

module.exports = router;
