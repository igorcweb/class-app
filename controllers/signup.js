var express = require('express');
var router = express.Router();
var Joi = require('joi');
var bcrypt = require('bcryptjs');
var ensureLoggedOut = require('../helpers/authMiddleware').ensureLoggedOut;

var Student = require('../models/student');
var schema = require('../controllers/joiSchema');

router.get('/', ensureLoggedOut, function(req, res) {
  res.render('signup', {
    urlPath: req.baseUrl
  });
});

router.post('/', function(req, res) {
  var condition = 'email = "' + req.body.email + '"';
  Joi.validate(req.body, schema, function(err) {
    var newStudent = {
      first_name: req.body.firstname.trim(),
      last_name: req.body.lastname.trim(),
      email: req.body.email.trim(),
      password: req.body.password.trim()
    };
    if (!err) {
      Student.findOne('email', 'students', condition, function(result) {
        if (result[0]) {
          req.flash(
            'error',
            'There is already an account associated with this email'
          );
          return res.render('signup', {
            error: req.flash('error')
          });
        } else {
          // Encrypting password
          bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(newStudent.password, salt, function(err, hash) {
              if (err) {
                throw err;
              }
              newStudent.password = hash;
              var { first_name, last_name, email, password } = newStudent;
              Student.insertOne(
                'students',
                ['first_name', 'last_name', 'email', 'password'],
                [first_name, last_name, email, password],
                function(result) {
                  console.log(result);
                }
              );
              req.flash('success', 'You are now registered and can log in');
              res.redirect('login');
            });
          });
        }
      });
    } else {
      req.flash('error', err.message);
      res.render('signup', { error: err.message });
    }
  });
});

module.exports = router;
