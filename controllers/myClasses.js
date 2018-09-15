var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('myClasses', {
    urlPath: req.baseUrl
  });
});

module.exports = router;
