const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
const env = require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

// User registration function
const register = async (req, res) => {
  const { username, email, password } = req.body; // Extract username, email, and password from the request body
  try {
    // Check if a user with the same email already exists
    const [existingUser] = await db.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    // Hash the password for secure storage
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database with username, email, and hashed password
    await db.execute(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// User login function
const login = async (req, res) => {
  const { email, password } = req.body; // Extract email and password from the request body
  try {
    // Check if a user with the provided email exists
    const [user] = await db.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (user.length === 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create a JWT token containing the user's ID
    const token = jwt.sign({ id: user[0].id }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { register, login };
