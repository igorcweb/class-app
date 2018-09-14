var express = require('express');
var router = express.Router();
var ensureAuthenticated = require('../helpers/authMiddleware')
  .ensureAuthenticated;

router.get('/', ensureAuthenticated, function(req, res) {
  var { first_name, last_name } = req.user[0];
  res.render('index', {
    urlPath: req.baseUrl,
    success: req.flash('success'),
    studentName: `${first_name} ${last_name}`
  });
});

module.exports = router;
