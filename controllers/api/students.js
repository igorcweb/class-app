import express from 'express';
const router = express.Router();
import Student from '../../models/student';

router.get('/', (req, res) => {
  Student.selectAll('students', results => {
    res.json(results);
  });
});

router.put('/register/:id', (req, res) => {
  const condition = 'id = ' + req.params.id;
  //Getting current classes
  Student.findOne('registeredIds', 'students', condition, results => {
    const currentIds = results[0].registeredIds;
    let totalIds;
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
      result => {
        if (result.changedRows === 0) {
          return releaseEvents.status(404).end();
        }
        res.status(200).end();
      }
    );
  });
});

router.put('/drop/:id', (req, res) => {
  const condition = 'id = ' + req.params.id;
  //Getting current classes
  Student.findOne('registeredIds', 'students', condition, results => {
    let currentIds = results[0].registeredIds;

    currentIds = currentIds.split(',').map(num => parseInt(num));
    const idToDrop = req.body.$classId;
    const indexToDrop = currentIds.indexOf(parseInt(idToDrop));
    currentIds.splice(indexToDrop, 1);
    const totalIds = currentIds;
    //Dropping classes
    Student.updateOne(
      'students',
      `registeredIds = '${totalIds}'`,
      condition,
      result => {
        if (result.changedRows === 0) {
          return releaseEvents.status(404).end();
        }
        res.status(200).end();
      }
    );
  });
});

export default router;
