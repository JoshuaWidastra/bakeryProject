const express = require("express");
const router = express.Router();
const {
  listUsers,
  registerUser,
  loginUser,
  showLanding,
} = require("../controllers/userController");

router.get("/home", showLanding);    // landing page
router.get("/", listUsers);          // list all users

// Registration
router.get("/register", registerUser);  // registration form
router.post("/register", registerUser); // handle registration

// login
router.get("/login", loginUser);  // login form
router.post("/login", loginUser); // handle login

module.exports = router;
