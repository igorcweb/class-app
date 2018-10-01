var connection = require('./connection');
import printQuestionMarks from '../helpers/orm';

var orm = {
  selectAll: function(table, cb) {
    var queryString = 'SELECT * FROM ??';
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
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },

  updateOne: function(table, values, condition, cb) {
    let queryString = 'UPDATE ' + table;
    queryString += ' SET ';
    queryString += values;
    queryString += ' WHERE ';
    queryString += condition;
    queryString += ';';
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  }
};

module.exports = orm;
