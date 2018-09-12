var express = require('express');
var orm = require('../config/orm');
var router = express.Router();
var Joi = require('joi');

var Student = require('../models/student');
var schema = require('../controllers/joiSchema');

router.get('/', function(req, res) {
  res.render('signup', {
    urlPath: req.baseUrl
  });
});

// student.selectAll('students', function(result) {
//   console.log(result);
// });

// Student.insertOne(
//   'students',
//   ['first_name', 'last_name', 'email', 'password'],
//   ['John', 'Doe', 'jdoe@email.com', 'asdfasdf'],
//   function(result) {
//     console.log(result);
//   }
// );

module.exports = router;
