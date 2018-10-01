import express from 'express';
const router = express.Router();
import Class from '../../models/class';

router.get('/', (req, res) => {
  Class.selectAll('classes', results => {
    res.json(results);
  });
});
router.put('/register/:id', (req, res) => {
  const id = req.params.id;
  const condition = 'id = ' + id;
  Class.selectAll('classes', results => {
    results.forEach($class => {
      if ($class.id === parseInt(req.params.id)) {
        const availableSpaces = $class.availableSpaces - 1;
        Class.updateOne(
          'classes',
          `availableSpaces = '${availableSpaces}'`,
          condition,
          result => {
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
router.put('/drop/:id', (req, res) => {
  const id = req.params.id;
  const condition = 'id = ' + id;
  Class.selectAll('classes', results => {
    results.forEach($class => {
      if ($class.id === parseInt(req.params.id)) {
        var availableSpaces = $class.availableSpaces + 1;
        Class.updateOne(
          'classes',
          `availableSpaces = '${availableSpaces}'`,
          condition,
          result => {
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

export default router;
