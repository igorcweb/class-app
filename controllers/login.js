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
    loggedin: req.flash('loggedin')
  });
});

passport.serializeUser(function(student, done) {
  done(null, student.id);
});

passport.deserializeUser(function(id, done) {
  var condition = 'id = ' + id;
  Student.findOne('*', 'students', condition, function(student) {
    done(student);
  });
});

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email'
    },
    function(email, password, done) {
      var condition = 'email = "' + email + '"';
      Student.findOne('email, password', 'students', condition, function(
        student
      ) {
        var studentPassword = student.password;
        bcrypt.compare(password, studentPassword, function(err, isMatch) {
          if (err) {
            console.log(err);
            return;
          }
          if (!isMatch) {
            return done(null, false, {
              message: 'Invalid Password'
            });
          }
          return done(null, student);
        });
      });
    }
  )
);

var candidate = {
  email: 'igorchern07@gmail.com',
  password: 'asdfasdf'
};

// var { email, password } = candidate;
// function compare() {
//   var condition = 'email = "' + email + '"';
//   Student.findOne('email, password', 'students', condition, function(student) {
//     console.log(student);
//     console.log('arguments: ', password, candidate.password);

//     bcrypt.compare(
//       '$2a$10$4OeOs.qQMyNNORcMgpsB/eWF7I.5pkbo1FAwGbqZSxSvULFREdpIi',
//       password,
//       function(err, isMatch) {
//         if (err) {
//           console.log('something went wrong', err);
//         } else if (!isMatch) {
//           console.log('passwords do not match');
//         } else {
//           console.log('matched!');
//         }
//       }
//     );
//   });
// }

// compare();

router.post(
  '/',
  passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: 'Invalid email or password'
  }),
  (req, res) => {
    req.flash('loggedin', ' You are now logged in');
    res.redirect('/');
  }
);

module.exports = router;
