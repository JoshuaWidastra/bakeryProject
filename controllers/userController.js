const db = require('../models');

// list users
const listUsers = async (req, res) => {
  const users = await db.User.findAll();
  res.json(users);
};

// register new user
const registerUser = async (req, res) => {
  const { email, password, role } = req.body;
  const newUser = await db.User.create({ email, password, role });
  res.json(newUser);
};

// log in a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await db.User.findOne({ where: { email, password } });
  if (user) {
    res.json({ message: 'Login successful', user });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

module.exports = { listUsers, registerUser, loginUser };
