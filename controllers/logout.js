var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  req.logout();
  req.flash('loggedOut', 'You are now logged out');
  res.redirect('/login');
});

module.exports = router;
