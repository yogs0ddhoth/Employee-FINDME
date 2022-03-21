// require dependancies
const inquirer = require('inquirer');

// require modules
const { Input, List } = require('./lib/prompts');
const dbQuery = require('./lib/db');

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

// Main functionality 
async function init() {
  // inquirer.prompt(MenuPrompt)
  // .then(answers => {
  //   // console.log(answers);
  //   //TODO CONSTRUCT SWITCH CASE TO HANDLE ANSWERS
  //   if (answers.menu !== 'exit') {
  //     db(answers, init);
  //   } else {
  //     // process.exit(0);
  //   }
  // })
  const uiSel = await inquirer.prompt(MenuPrompt);
  
  switch (uiSel.menu) {
    case 'view all departments':
      dbQuery('SELECT * FROM department', init);
      // init();
      break;
    // case 'view all roles':
    // case 'view all employees':
    // case 'add a department':
    // case 'add a role':
    // case 'add an employee':
    // case 'update an employee role':
    case 'exit':
      process.exit(0);
  }
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