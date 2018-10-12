const express = require('express');
const router = express.Router();
const ensureAuthenticated = require('../helpers/authMiddleware')
  .ensureAuthenticated;

router.get('/', ensureAuthenticated, (req, res) => {
  const { id, first_name, last_name, registeredIds } = req.user[0];
  res.render('index', {
    success: req.flash('success'),
    id,
    first_name,
    last_name,
    registeredIds
  });
});

module.exports = router;
