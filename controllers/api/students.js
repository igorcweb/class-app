var express = require('express');
var router = express.Router();
var Student = require('../../models/student');

router.get('/', function(req, res) {
  Student.selectAll('students', function(results) {
    res.json(results);
  });
});

module.exports = router;
