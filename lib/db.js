const mysql = require('mysql2/promise');
const cTable = require('console.table');
const init = require('../server');

// Database functionality 
async function dbQuery(func, sqlQuery, param3, param4, param5, param6) {
  const connParams = {
    host: 'localhost',
    user: 'root',
    password: 'rootroot',
    database: 'findme_db'
  };
  // connect to mysql and execute query
  const conn = await mysql.createConnection(connParams);
  const [rows, fields] = await conn.execute(sqlQuery, param3, param4, param5, param6);
  // display query results with console.table
  console.table(rows);
  await conn.end();
  // call parent function
  func();
}

module.exports = dbQuery;