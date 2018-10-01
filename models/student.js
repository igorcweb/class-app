import orm from '../config/orm';

var student = {
  insertOne: function(table, cols, vals, cb) {
    orm.insertOne(table, cols, vals, function(result) {
      cb(result);
    });
  },
  selectAll: function(table, cb) {
    orm.selectAll(table, function(results) {
      cb(results);
    });
  },
  findOne: function(col, table, condition, cb) {
    orm.findOne(col, table, condition, function(result) {
      cb(result);
    });
  },
  updateOne: function(table, values, condition, cb) {
    orm.updateOne(table, values, condition, function(result) {
      cb(result);
    });
  }
};

// var condition = 'id = 1';
// student.updateOne('students', { registeredIds: '1, 2, 3' }, condition, function(
//   result
// ) {
//   console.log(result);
// });

// {
//   if (result.changedRows === 0) {
//     return releaseEvents.status(404).end();
//   }
//   res.status(200).end();
// }

module.exports = student;
