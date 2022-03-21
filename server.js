// require dependancies
// const mysql = require('mysql2/promise');
const inquirer = require('inquirer');
// const cTable = require('console.table');
// require modules
const { Input, List } = require('./lib/prompts');
const db = require('./lib/db');

// // initiate mysql2
// const _db = mysql.createConnection(
//   {
//     host: 'localhost',
//     user: 'root',
//     password: 'rootroot',
//     database: 'findme_db'
//   },
// );

// UI functionality
const menu = [
  'view all departments',
  'view all roles',
  'view all employees',
  'add a department',
  'add a role',
  'add an employee',
  'update an employee role',
  'exit'
];
const MenuPrompt = [new List('menu', 'Main Menu', menu)];

const promptMenu = () => inquirer.prompt(MenuPrompt);
  // .then(db.function(answers) {}); <-- put in main function

// // Database functionality
// const db = (answers) => {

//   if (answers.menu !== 'exit') {
//     const connParams = {
//       host: 'localhost',
//       user: 'root',
//       password: 'rootroot',
//       database: 'findme_db'
//     };

//     if (answers.menu == 'view all departments') {
//       // initiate mysql2 promise
//       mysql.createConnection(connParams)
//       .then(conn => conn.query('SELECT * FROM department'))
//       .then(([rows, fields]) => {
//         console.table(rows);
//         init();
//       });
//     }
//     else if (answers.menu == 'view all roles') {
//       // initiate mysql2 promise
//       mysql.createConnection(connParams)
//       .then(conn => conn.query(''))
//       .then(([rows, fields]) => {
//         console.table(rows);
//         init();
//       });
//     }
//     else if (answers.menu == 'view all employees') {
//        // initiate mysql2 promise
//        mysql.createConnection(connParams)
//        .then(conn => conn.query(`
//           SELECT e.id, e.first_name, e.last_name, r.title, e.manager_id, r.salary, d.name department 
//           FROM employee e 
//           LEFT JOIN role r ON e.role_id = r.id 
//           LEFT JOIN department d ON r.department_id = d.id
//           `))
//        .then(([rows, fields]) => {
//          console.table(rows);
//          init();
//        });
//     }
//     else if (answers.menu == 'add a department') {
//        // initiate mysql2 promise
//        mysql.createConnection(connParams)
//        .then(conn => conn.query(''))
//        .then(([rows, fields]) => {
//          console.table(rows);
//          init();
//        });
//     }
//     else if (answers.menu == 'add a role') {
//        // initiate mysql2 promise
//        mysql.createConnection(connParams)
//        .then(conn => conn.query(''))
//        .then(([rows, fields]) => {
//          console.table(rows);
//          init();
//        });
//     }
//     else if (answers.menu == 'add an employee') {
//        // initiate mysql2 promise
//        mysql.createConnection(connParams)
//        .then(conn => conn.query(''))
//        .then(([rows, fields]) => {
//          console.table(rows);
//          init();
//        });
//     }
//     else if (answers.menu == 'update an employee role') {
//        // initiate mysql2 promise
//        mysql.createConnection(connParams)
//        .then(conn => conn.query(''))
//        .then(([rows, fields]) => {
//          console.table(rows);
//          init();
//        });
//     };
//   }
// }

// Main functionality 
const init = () => {
  inquirer.prompt(MenuPrompt)
  .then(answers => {
    // console.log(answers);
    if (answers.menu !== 'exit') {
      db(answers, init);
      // init();
    } else {
      return;
    }
  })
};

init();
// default joined tables
// `
// SELECT e.id, e.first_name, e.last_name, r.title, e.manager_id, r.salary, d.name department 
// FROM employee e 
// LEFT JOIN role r ON e.role_id = r.id 
// LEFT JOIN department d ON r.department_id = d.id;
// `
module.exports = init;