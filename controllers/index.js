var express = require('express');
var router = express.Router();
var ensureAuthenticated = require('../helpers/authMiddleware')
  .ensureAuthenticated;

router.get('/', ensureAuthenticated, function(req, res) {
  res.render('index', {
    urlPath: req.baseUrl
  });
});

module.exports = router;
