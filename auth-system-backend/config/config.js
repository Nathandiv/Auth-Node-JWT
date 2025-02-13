const dotenv = require('dotenv');
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET; // ✅ Fix typo

module.exports = JWT_SECRET;
