const db = require("../models");
const bcrypt = require("bcryptjs"); // for password hashing

// show landing page
const showLanding = async (req, res) => {
  res.render("Homepage");
};

// list users
const listUsers = async (req, res) => {
  try {
    const users = await db.User.findAll();
    res.render("Homepage", { users });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

// register new user
const registerUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Input validation
    if (!email || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.User.create({ email, password: hashedPassword, role });
    res.render("Register", { message: 'Registration successful', newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

// log in a user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // input validation
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const user = await db.User.findOne({ where: { email } });
    if (user && await bcrypt.compare(password, user.password)) {
      res.render("Login", { message: "Login successful", user });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

module.exports = { listUsers, registerUser, loginUser, showLanding };
