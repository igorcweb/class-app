import connection from './connection';
import { printQuestionMarks } from '../helpers/orm';

const orm = {
  selectAll: (table, cb) => {
    const queryString = 'SELECT * FROM ??';
    connection.query(queryString, [table], (err, result) => {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },

  insertOne: (table, cols, vals, cb) => {
    let queryString = 'INSERT INTO ' + table;
    queryString += ' (';
    queryString += cols.toString();
    queryString += ') ';
    queryString += 'VALUES (';
    queryString += printQuestionMarks(vals.length);
    queryString += ') ';
    connection.query(queryString, vals, (err, result) => {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  findOne: (col, table, condition, cb) => {
    let queryString = 'SELECT ' + col;
    queryString += ' FROM ' + table;
    queryString += ' WHERE ' + condition;
    connection.query(queryString, (err, result) => {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },

  updateOne: (table, values, condition, cb) => {
    let queryString = 'UPDATE ' + table;
    queryString += ' SET ';
    queryString += values;
    queryString += ' WHERE ';
    queryString += condition;
    queryString += ';';
    connection.query(queryString, (err, result) => {
      if (err) {
        throw err;
      }
      cb(result);
    });
  }
};

export default orm;
