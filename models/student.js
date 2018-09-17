var orm = require('../config/orm');

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
  }
};

module.exports = student;
