const express = require('express');
const router = express.Router();
const ensureLoggedOut = require('../helpers/authMiddleware').ensureLoggedOut;
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Student = require('../models/student');

router.get('/', ensureLoggedOut, (req, res) => {
  res.render('login', {
    success: req.flash('success'),
    error: req.flash('error')
  });
});

passport.serializeUser((student, done) => {
  done(null, student.id);
});

passport.deserializeUser((id, done) => {
  const condition = 'id = ' + id;
  Student.findOne('*', 'students', condition, student => {
    done(null, student);
  });
});

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email'
    },
    (email, password, done) => {
      const condition = 'email = "' + email + '"';
      Student.findOne('*', 'students', condition, results => {
        if (!results[0]) {
          console.log('Unknown Username');
          return done(null, false, { message: 'Unknown Username' });
        }
        const student = results[0];
        const studentPassword = student.password;
        bcrypt
          .compare(password, studentPassword)
          .then(isMatch => {
            if (isMatch) {
              console.log('isMatch:', isMatch);
              return done(null, student);
            }
            console.log('isMatch:', isMatch);
            return done(null, false, { message: 'Incorrect Password' });
          })
          .catch(err => {
            console.log('catch:', err);
          });
      });
    }
  )
);

router.post(
  '/',
  passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/',
    failureFlash: 'Invalid email or password'
  })
);

module.exports = router;
