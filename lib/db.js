const mysql = require('mysql2/promise');
const cTable = require('console.table');
const init = require('../server');

// Database functionality 
async function dbQuery(func, sqlQuery) {
  const connParams = {
    host: 'localhost',
    user: 'root',
    password: 'rootroot',
    database: 'findme_db'
  };
  // connect to mysql and execute query
  const conn = await mysql.createConnection(connParams);
  const [rows, fields] = await conn.execute(sqlQuery, querValues);
  // display query results with console.table
  console.table(rows);
  await conn.end();
  // call parent function
  func();
}

module.exports = dbQuery;