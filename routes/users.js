const express = require("express");
const router = express.Router();
const {
  listUsers,
  registerUser,
  loginUser,
  showLanding,
  logoutUser,
  showLandingUser,
  getProfile,
  postProfile,
} = require("../controllers/userController");

const isAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    return next();
  } else {
    res.redirect("/login");
  }
};

router.get("/home", showLanding); // landing page
router.get("/", listUsers); // list all users

router.get("/users", showLandingUser);

// registration
router.get("/register", registerUser); // registration form
router.post("/register", registerUser); // handle registration

// login
router.get("/login", loginUser); // login form
router.post("/login", loginUser); // handle login

// logout
router.get("/logout", logoutUser); // handle logout

// protected route example
router.get("/dashboard", isAuthenticated, (req, res) => {
  // render protected dashboard page
  res.render("Dashboard", { userId: req.session.userId });
});

//profile
router.get("/profile/:id", getProfile);
router.post("/profile/:id/add", postProfile);

module.exports = router;
