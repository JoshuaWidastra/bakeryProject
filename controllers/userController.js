const db = require("../models");
const bcrypt = require("bcryptjs");

// landing page
const showLanding = async (req, res) => {
  try {
    res.render("Homepage");
  } catch (error) {
    res.status(500).json({ message: "Error displaying homepage", error });
  }
};

// landing page logged in
const showLandingUser = async (req, res) => {
  try {
    res.render("Homepage-User", { user: req.session.user });
  } catch (error) {
    res.status(500).json({ message: "Error displaying homepage user", error });
  }
};

// list users
const listUsers = async (req, res) => {
  try {
    const users = await db.User.findAll();
    res.render("Homepage-User", { users });
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

// register new user
const registerUser = async (req, res) => {
  try {
    if (req.method === "POST") {
      const { email, password, role } = req.body;

      if (!email || !password) {
        return res.status(400).render("Register", { message: "All fields are required" });
      }

      // hash password
      const hashedPassword = await bcrypt.hash(password, 10); 

      // create user based of hashed password
      const user = await db.User.create({ email, password: hashedPassword, role });

      res.render("Login", { message: "Registration successful" });

    } else {
      res.render("Register");
    }
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const messages = error.errors.map(err => err.message);
      return res.status(400).render('Register', { message: messages.join(', ') });
    }
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
      if (user && (await bcrypt.compare(password, user.password))) {

        // save user id & role in session
        req.session.userId = user.id;
        req.session.userRole = user.role;
        req.session.user = user; // save user data in session
        res.redirect("/users/home");
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

// log out a user
const logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Error logging out", error: err });
    }
    res.redirect("/login");
  });
};

module.exports = {
  listUsers,
  registerUser,
  loginUser,
  showLanding,
  logoutUser,
  showLandingUser,
};
