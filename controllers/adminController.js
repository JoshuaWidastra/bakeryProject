const db = require('../models');

const renderAdminDashboard = async (req, res) => {
  try {
    const user = await db.User.findByPk(req.session.userId);
    if (user.role === 'admin') {
      const mostPopularItem = user.mostPopularItem;
      res.render('AdminDashboard', { mostPopularItem });
    } else {
      res.redirect('/'); // redirect non-admin users
    }
  } catch (error) {
    res.status(500).json({ message: "Error loading admin dashboard", error });
  }
};

module.exports = { renderAdminDashboard };
