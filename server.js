// require dependancies
const inquirer = require('inquirer');

// require modules
const { Input, List } = require('./lib/prompts');
const dbQuery = require('./lib/db');
const Prompt = require('inquirer/lib/prompts/base');

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

const MenuPrompt = [
  new List('menu', 'Main Menu', menu),
  new Input('name', 'Enter Department Name:', answers => answers.menu == 'add a department')
  // new Input('add_role', '', answers => answers.menu == 'add a role'),
  // new Input('add_emp', '', answers => answers.menu == 'add an employee'),
];

// Main functionality 
async function init() {
  const uiSel = await inquirer.prompt(MenuPrompt);
  console.log(uiSel);
  switch (uiSel.menu) {
    case 'view all departments':
      dbQuery(init, 'SELECT * FROM departments');
      break;
    case 'view all roles':
      dbQuery(init, 'SELECT * FROM roles');
      break;
    case 'view all employees':
      dbQuery(init, 'SELECT * FROM employees');
      break;
    case 'add a department':
      dbQuery(init, `INSERT INTO departments (name) VALUES ('${uiSel.name}')`);
      break;
    case 'add a role':
      dbQuery(init, ``);
      break;
    case 'add an employee':
      dbQuery(init, ``);
      break;
    case 'update an employee role':
      dbQuery(init, ``);
      break;
    case 'exit':
      process.exit(0);
  }
};

init();
// default joined tables
// `
// SELECT e.id, e.first_name, e.last_name, r.title, e.manager_id, r.salary, d.name department 
// FROM employees e 
// LEFT JOIN roles r ON e.role_id = r.id 
// LEFT JOIN departments d ON r.department_id = d.id;
// `
module.exports = init;