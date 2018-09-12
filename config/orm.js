var connection = require('./connection');
var printQuestionMarks = require('../helpers/orm').printQuestionMarks;

var orm = {
  selectAll: function(table, cb) {
    var queryString = 'SELECT * FROM ??';
    console.log(queryString);
    connection.query(queryString, [table], function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },

  insertOne: function(table, cols, vals, cb) {
    var queryString = 'INSERT INTO ' + table;
    queryString += ' (';
    queryString += cols.toString();
    queryString += ') ';
    queryString += 'VALUES (';
    queryString += printQuestionMarks(vals.length);
    queryString += ') ';
    console.log(queryString);
    connection.query(queryString, vals, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  findOne: function(col, table, condition, cb) {
    var queryString = 'SELECT ' + col;
    queryString += ' FROM ' + table;
    queryString += ' WHERE ' + condition;
    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  }
};

module.exports = orm;
