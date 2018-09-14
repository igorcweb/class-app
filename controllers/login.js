var express = require('express');
var router = express.Router();
var ensureLoggedOut = require('../helpers/authMiddleware').ensureLoggedOut;
var bcrypt = require('bcryptjs');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Student = require('../models/student');

router.get('/', ensureLoggedOut, function(req, res) {
  res.render('login', {
    urlPath: req.baseUrl,
    success: req.flash('success'),
    error: req.flash('error')
  });
});

passport.serializeUser(function(student, done) {
  done(null, student.id);
});

passport.deserializeUser(function(id, done) {
  var condition = 'id = ' + id;
  Student.findOne('*', 'students', condition, function(student) {
    done(null, student);
  });
});

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email'
    },
    function(email, password, done) {
      var condition = 'email = "' + email + '"';
      Student.findOne('*', 'students', condition, function(results) {
        if (!results[0]) {
          console.log('Unknown Username');
          return done(null, false, { message: 'Unknown Username' });
        }
        var student = results[0];
        var studentPassword = student.password;
        bcrypt
          .compare(password, studentPassword)
          .then(function(isMatch) {
            if (isMatch) {
              console.log('isMatch:', isMatch);
              return done(null, student);
            }
            console.log('isMatch:', isMatch);
            return done(null, false, { message: 'Incorrect Password' });
          })
          .catch(function(err) {
            console.log('catch:', err);
          });
      });
    }
  )
);

// router.post(
//   '/',
//   passport.authenticate('local', {
//     failureRedirect: '/login',
//     failureFlash: 'Invalid email or password'
//   }),
//   function(req, res) {
//     req.flash('success', ' You are now logged in');
//     res.redirect('/');
//   }
// );
router.post(
  '/',
  passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/',
    failureFlash: 'Invalid email or password',
    successFlash: 'You are now logged in!'
  })
);

module.exports = router;
