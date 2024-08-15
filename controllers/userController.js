const db = require("../models");
const bcrypt = require("bcryptjs");

// show landing page
const showLanding = async (req, res) => {
  try {
    res.render("Homepage");
  } catch (error) {
    res.status(500).json({ message: "Error displaying homepage", error });
  }
};

// list users
const listUsers = async (req, res) => {
  try {
    const users = await db.User.findAll();
    res.render("Homepage", { users }); // pass users to the view
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

// register new user
const registerUser = async (req, res) => {
  try {
    if (req.method === "POST") {
      const { email, password, role } = req.body;

      if (!email || !password || !role) {
        return res.status(400).render("Register", { message: "All fields are required" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      await db.User.create({ email, password: hashedPassword, role });
      res.render("Register", { message: "Registration successful" });
    } else {
      res.render("Register");
    }
  } catch (error) {
    res.status(500).render("Register", { message: "Error registering user", error });
  }
};

// log in a user
const loginUser = async (req, res) => {
  try {
    if (req.method === "POST") {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).render("Login", { message: "All fields are required" });
      }

      const user = await db.User.findOne({ where: { email } });
      if (user && await bcrypt.compare(password, user.password)) {
        res.render("Login", { message: "Login successful", user });
      } else {
        res.status(401).render("Login", { message: "Invalid credentials" });
      }
    } else {
      res.render("Login");
    }
  } catch (error) {
    res.status(500).render("Login", { message: "Error logging in", error });
  }
};

module.exports = { listUsers, registerUser, loginUser, showLanding };
