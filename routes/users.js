const express = require("express");
const router = express.Router();

// controller function. for later
const {
  listUsers,
  registerUser,
  loginUser,
  showLanding,
} = require("../controllers/userController");

router.get("/", showLanding); // masih percobaan

// route ke list all users
router.get("/", listUsers);

// route ke register new user
router.post("/register", registerUser);

// route log in a user
router.post("/login", loginUser);

module.exports = router;
