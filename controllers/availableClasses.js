var express = require('express');
var router = express.Router();
// var Class = require('../models/class');
// var classes = require('../db/classes');

//Only run this code to reseed classes data after recreating the database.
// classes.forEach(function(classObj) {
//   var { name, code, semester, description } = classObj;
//   Class.insertOne(
//     'classes',
//     ['name', 'code', 'semester', 'description'],
//     [name, code, semester, description],
//     function(result) {
//       console.log(result);
//     }
//   );
// });

router.get('/', function(req, res) {
  res.render('availableClasses', {
    urlPath: req.baseUrl
  });
});

module.exports = router;
