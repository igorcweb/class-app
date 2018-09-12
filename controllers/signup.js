var express = require('express');
var orm = require('../config/orm');
var router = express.Router();
var Joi = require('joi');
var bcrypt = require('bcryptjs');

var student = require('../models/student');
var schema = require('../controllers/joiSchema');

router.get('/', function(req, res) {
  res.render('signup', {
    urlPath: req.baseUrl
  });
});

router.post('/', function(req, res) {
  var condition = 'email = "' + req.body.email + '"';
  student.findOne('email', 'students', condition, function(result) {
    if (result[0]) {
      req.flash(
        'error',
        'There is already an account associated with this email'
      );
      res.render('signup', {
        error: req.flash('error')
      });
      return;
    }
    Joi.validate(req.body, schema, function(err) {
      var newStudent = {
        first_name: req.body.firstname,
        last_name: req.body.lastname,
        email: req.body.email,
        password: req.body.password
      };

      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newStudent.password, salt, function(err, hash) {
          if (err) {
            throw err;
          }
          newStudent.password = hash;
          var { first_name, last_name, email, password } = newStudent;
          student.insertOne(
            'students',
            ['first_name', 'last_name', 'email', 'password'],
            [first_name, last_name, email, password],
            function(result) {
              console.log(result);
            }
          );
        });
      });

      if (!err) {
        req.flash('success', 'You are now registered and can log in');
        res.redirect('login');
      } else {
        req.flash('error', err.message);
        res.render('signup', { error: err.message });
      }
    });
  });
});

// student.selectAll('students', function(result) {
//   console.log(result);
// });

// student.insertOne(
//   'students',
//   ['first_name', 'last_name', 'email', 'password'],
//   ['John', 'Doe', 'jdoe@email.com', 'asdfasdf'],
//   function(result) {
//     console.log(result);
//   }
// );

module.exports = router;
