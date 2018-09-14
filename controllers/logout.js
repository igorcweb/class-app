var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  req.logout();
  req.flash('success', 'You are now logged out');
  res.redirect('/login');
  req.session.destroy();
});

module.exports = router;
