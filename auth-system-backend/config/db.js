const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'users_db',
  password: 'Nathan123',
});

module.exports = pool.promise();
