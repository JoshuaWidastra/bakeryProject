const express = require('express');
const router = express.Router();
const { renderAdminDashboard } = require('../controllers/adminController');

const isAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    return next();
  } else {
    res.redirect('/login');
  }
};

router.get('/dashboard', isAuthenticated, renderAdminDashboard);

module.exports = router;
