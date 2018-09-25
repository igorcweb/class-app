var express = require('express');
var router = express.Router();
var Student = require('../../models/student');

router.get('/', function(req, res) {
  Student.selectAll('students', function(results) {
    res.json(results);
  });
});

router.put('/register/:id', function(req, res) {
  var condition = 'id = ' + req.params.id;
  //Getting current classes
  Student.findOne('registeredIds', 'students', condition, function(results) {
    var currentIds = results[0].registeredIds;
    var totalIds;
    if (currentIds) {
      totalIds = currentIds + ',' + req.body.registeredIds;
    } else {
      totalIds = req.body.registeredIds;
    }
    //Adding new classes
    Student.updateOne(
      'students',
      `registeredIds = '${totalIds}'`,
      condition,
      function(result) {
        if (result.changedRows === 0) {
          return releaseEvents.status(404).end();
        }
        res.status(200).end();
      }
    );
  });
});

router.put('/drop/:id', function(req, res) {
  var condition = 'id = ' + req.params.id;
  //Getting current classes
  Student.findOne('registeredIds', 'students', condition, function(results) {
    var currentIds = results[0].registeredIds;

    currentIds = currentIds.split(',').map(function(num) {
      return parseInt(num);
    });
    var idToDrop = req.body.$classId;
    var indexToDrop = currentIds.indexOf(parseInt(idToDrop));
    currentIds.splice(indexToDrop, 1);
    var totalIds = currentIds;

    //Dropping classes
    Student.updateOne(
      'students',
      `registeredIds = '${totalIds}'`,
      condition,
      function(result) {
        if (result.changedRows === 0) {
          return releaseEvents.status(404).end();
        }
        res.status(200).end();
      }
    );
  });

  // var condition = 'id = ' + req.user[0].id;
});

module.exports = router;
