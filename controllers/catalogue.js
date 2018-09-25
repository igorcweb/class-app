var express = require('express');
var router = express.Router();
var Class = require('../models/class');

// Only run this code to reseed classes data after running the schema file first.

// var classes = require('../db/classes');
// classes.forEach(function(classObj) {
//   var { name, code, semester, availableSpaces, description } = classObj;
//   Class.insertOne(
//     'classes',
//     ['name', 'code', 'semester', 'availableSpaces', 'description'],
//     [name, code, semester, availableSpaces, description],
//     function(result) {
//       console.log(result);
//     }
//   );
// });

router.get('/', function(req, res) {
  var id;
  //If student is logged in
  if (req.user) {
    id = req.user[0].id;
  }
  Class.selectAll('classes', function(results) {
    res.render('catalogue', {
      classes: results,
      studentId: id
    });
  });
});

module.exports = router;
