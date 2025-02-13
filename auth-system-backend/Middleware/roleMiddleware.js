// middleware/roleMiddleware.js
const db = require('../config/db'); // Adjust the path as necessary

const isAdmin = async (req, res, next) => {
  try {
    const userId = req.user.id; // Assuming user ID is stored in req.user
    const [user] = await db.execute('SELECT is_admin FROM users WHERE id = ?', [userId]);

    if (user.length === 0 || !user[0].is_admin) {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    next(); // User is an admin, proceed to the next middleware or route handler
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = isAdmin;
