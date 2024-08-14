const db = require("../models");

const showLanding = async(req,res) => {
  res.render("Homepage")
}
// list users
const listUsers = async (req, res) => {
  const users = await db.User.findAll();
  res.render("Homepage", { users });
};

// register new user
const registerUser = async (req, res) => {
  const { email, password, role } = req.body;
  const newUser = await db.User.create({ email, password, role });
  res.render("Register");
};

// log in a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await db.User.findOne({ where: { email, password } });
  if (user) {
    res.render("Login", { message: "Login successful", user });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};

module.exports = { listUsers, registerUser, loginUser, showLanding};
