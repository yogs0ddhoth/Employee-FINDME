const mysql = require('mysql2/promise');
const cTable = require('console.table');
const init = require('../server');
// require('dotenv').config();
const connParams = require('../config/connection')

// Database functionality 
async function dbQuery(func, sqlQuery) {
  // connect to mysql and execute query
  const conn = await mysql.createConnection(connParams);
  console.log('success1');
  const [rows, fields] = await conn.execute(sqlQuery);
  console.log('success2');
  // display query results with console.table
  console.table(rows);
  console.log('success3');
  await conn.end();
  console.log('success4');
  // call parent function
  func();
}

module.exports = dbQuery;