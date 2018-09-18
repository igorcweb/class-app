var express = require('express');
var router = express.Router();
var Class = require('../../models/class');

router.get('/', function(req, res) {
  Class.selectAll('classes', function(results) {
    console.log(results[0]);
    res.json(results);
  });
});

module.exports = router;
