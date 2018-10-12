const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  req.logout();
  req.flash('success', 'You are now logged out');
  res.redirect('/login');
  req.session.destroy();
});

module.exports = router;
