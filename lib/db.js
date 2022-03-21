const mysql = require('mysql2/promise');
const cTable = require('console.table');

// Database functionality 
// TODO: extract mysql functions, parameters, and .then() functions from the if else statements and save as variables
// // export variables
// // remove if else statements and put in server.js init()
const db = (answers, init) => {
  // if (answers.menu !== 'exit') {
    const connParams = {
      host: 'localhost',
      user: 'root',
      password: 'rootroot',
      database: 'findme_db'
    };

    if (answers.menu == 'view all departments') {
      // initiate mysql2 promise
      mysql.createConnection(connParams)
      .then(conn => conn.query('SELECT * FROM department'))
      .then(([rows, fields]) => {
        console.table(rows);
        init();
      });
    }
    else if (answers.menu == 'view all roles') {
      // initiate mysql2 promise
      mysql.createConnection(connParams)
      .then(conn => conn.query(''))
      .then(([rows, fields]) => {
        console.table(rows);
        init();
      });
    }
    else if (answers.menu == 'view all employees') {
       // initiate mysql2 promise
       mysql.createConnection(connParams)
       .then(conn => conn.query(`
          SELECT e.id, e.first_name, e.last_name, r.title, e.manager_id, r.salary, d.name department 
          FROM employee e 
          LEFT JOIN role r ON e.role_id = r.id 
          LEFT JOIN department d ON r.department_id = d.id
          `))
       .then(([rows, fields]) => {
         console.table(rows);
         init();
       });
    }
    else if (answers.menu == 'add a department') {
       // initiate mysql2 promise
       mysql.createConnection(connParams)
       .then(conn => conn.query(''))
       .then(([rows, fields]) => {
         console.table(rows);
        //  init();
       });
    }
    else if (answers.menu == 'add a role') {
       // initiate mysql2 promise
       mysql.createConnection(connParams)
       .then(conn => conn.query(''))
       .then(([rows, fields]) => {
         console.table(rows);
        //  init();
       });
    }
    else if (answers.menu == 'add an employee') {
       // initiate mysql2 promise
       mysql.createConnection(connParams)
       .then(conn => conn.query(''))
       .then(([rows, fields]) => {
         console.table(rows);
        //  init();
       });
    }
    else if (answers.menu == 'update an employee role') {
       // initiate mysql2 promise
       mysql.createConnection(connParams)
       .then(conn => conn.query(''))
       .then(([rows, fields]) => {
         console.table(rows);
        //  init();
       });
    };
  // } else {
  //   return;
  // }
};

module.exports = db;