const express = require('express');
const router = express.Router();
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const ensureLoggedOut = require('../helpers/authMiddleware').ensureLoggedOut;
const Student = require('../models/student');
const schema = require('./joiSchema');

router.get('/', ensureLoggedOut, (req, res) => {
  res.render('signup');
});

router.post('/', (req, res) => {
  const condition = 'email = "' + req.body.email + '"';
  Joi.validate(req.body, schema, err => {
    const newStudent = {
      first_name: req.body.firstname.trim(),
      last_name: req.body.lastname.trim(),
      email: req.body.email.trim(),
      password: req.body.password.trim()
    };
    if (!err) {
      Student.findOne('email', 'students', condition, result => {
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
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newStudent.password, salt, (err, hash) => {
              if (err) {
                throw err;
              }
              newStudent.password = hash;
              const { first_name, last_name, email, password } = newStudent;
              Student.insertOne(
                'students',
                ['first_name', 'last_name', 'email', 'password'],
                [first_name, last_name, email, password],
                result => {
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
