const mysql = require('mysql2/promise');
const cTable = require('console.table');
const init = require('../server');
// require('dotenv').config();
const connParams = require('../config/connection')

// Database functionality 
const queryDb = async (sqlQuery, func) => {
  // connect to mysql and execute query
  const conn = await mysql.createConnection(connParams);
  console.log('Connecting to Database...');

  const [rows, fields] = await conn.execute(sqlQuery);
  console.log('Success!\n');
  // display query results with console.table
  console.table(rows);
  await conn.end();

  // call parent function to loop main menu
  func();
}

module.exports = queryDb;