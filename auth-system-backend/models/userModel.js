// models/userModel.js
const db = require('../config/db'); // Ensure this path is correct

// Function to find a user by username
const findByUsername = async (username) => {
  const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
  return rows[0]; // Return the first user found
};

// Function to create a new user
const createUser = async (username, email, password) => {
  const [result] = await db.execute('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password]);
  return result.insertId; // Return the ID of the newly created user
};

module.exports = { findByUsername, createUser };
