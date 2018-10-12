const express = require('express');
const router = express.Router();
const Class = require('../models/class');

//Only run this code to reseed classes data after running the schema file first.

// const classes = require('../db/classes');
// classes.forEach(classObj => {
//   const { name, code, semester, availableSpaces, description } = classObj;
//   Class.insertOne(
//     'classes',
//     ['name', 'code', 'semester', 'availableSpaces', 'description'],
//     [name, code, semester, availableSpaces, description],
//     result => {
//       console.log(result);
//     }
//   );
// });

router.get('/', (req, res) => {
  let id;
  //If student is logged in
  if (req.user) {
    id = req.user[0].id;
  }
  Class.selectAll('classes', results => {
    res.render('catalogue', {
      classes: results,
      studentId: id
    });
  });
});

module.exports = router;
