var express = require('express');
var router = express.Router();
var Class = require('../../models/class');

router.get('/', function(req, res) {
  Class.selectAll('classes', function(results) {
    res.json(results);
  });
});
router.put('/register/:id', function(req, res) {
  var id = req.params.id;
  var condition = 'id = ' + id;
  Class.selectAll('classes', function(results) {
    results.forEach(function($class) {
      if ($class.id === parseInt(req.params.id)) {
        var availableSpaces = $class.availableSpaces - 1;
        Class.updateOne(
          'classes',
          `availableSpaces = '${availableSpaces}'`,
          condition,
          function(result) {
            if (result.changedRows === 0) {
              return releaseEvents.status(404).end();
            }
            res.status(200).end();
          }
        );
      }
    });
  });
});

module.exports = router;
