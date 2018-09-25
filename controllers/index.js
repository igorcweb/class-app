var express = require('express');
var router = express.Router();
var ensureAuthenticated = require('../helpers/authMiddleware')
  .ensureAuthenticated;

router.get('/', ensureAuthenticated, function(req, res) {
  var { id, first_name, last_name, registeredIds, droppedIds } = req.user[0];
  res.render('index', {
    success: req.flash('success'),
    id,
    first_name,
    last_name,
    registeredIds,
    droppedIds
  });
});

module.exports = router;
