var dotenv = require('dotenv');
dotenv.config();
var mysql = require('mysql2');

var { DB_USER, DB_PASS, DB_NAME, JAWSDB_URL } = process.env;

var config = {
  host: 'localhost',
  port: 3306,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME
};

var connection;
var host;

if (JAWSDB_URL) {
  connection = mysql.createConnection(JAWSDB_URL);
  host = 'JAWSDB';
} else {
  connection = mysql.createConnection(config);
  host = 'locahost';
}

connection.connect(function(err) {
  if (err) {
    console.log('error connecting', err);
    return false;
  }
  console.log('connected with', host);
});

module.exports = connection;
