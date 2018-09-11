var connection = require('./connection');

var orm = {
  selectAll: function(column, table, cb) {
    let queryString = 'SELECT ?? FROM ??';
    connection.query(queryString, [column, table], function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  }
};

module.exports = orm;
