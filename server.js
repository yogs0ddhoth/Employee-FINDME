// require dependancies
const inquirer = require('inquirer');

// require modules
const { Input, List } = require('./lib/prompts');
const dbQuery = require('./lib/db');
// const Prompt = require('inquirer/lib/prompts/base');

// UI functionality
const menu = [
  'view all departments',
  'view all roles',
  'view all employees',
  'add a department',
  'add a role',
  'add an employee',
  'update an employee role',
  'update employee manager',
  'exit'
];

const MenuPrompt = [
  // Prompt Main Menu
  new List('menu', 'Main Menu', menu),
  
  // If 'add a department' is selected:
  new Input('name', 'Enter Department Name:', answers => answers.menu == 'add a department'),
  
  // If 'add a role' is selected:
  new Input('title', 'Enter Role Title:', answers => answers.menu == 'add a role'),
  new Input('salary', 'Enter Role Salary:', answers => answers.menu == 'add a role'),
  new Input('dep_id', 'Enter Department Id:', answers => answers.menu == 'add a role'),
  
  // If 'add an employee' is selected:
  new Input('f_name', 'Enter Employee First Name:', answers => answers.menu == 'add an employee'),
  new Input('l_name', 'Enter Employee Last Name:', answers => answers.menu == 'add an employee'),
  new Input('r_id', 'Enter Role Id:', answers => answers.menu == 'add an employee'),
  new Input('m_id', 'Enter Manager Id (Enter NULL if employee is manager):', answers => answers.menu == 'add an employee'),

  // If 'update an employee role' is selected:
  new Input('emp_id', 'Enter Employee Id:', answers => answers.menu == 'update an employee role'),
  new Input('emp_r', 'Enter new Role Id:', answers => answers.menu == 'update an employee role'),

  // If 'update employee manager' is selected:
  new Input('emp_id', 'Enter Employee Id:', answers => answers.menu == 'update employee manager'),
  new Input('m_id', 'Enter Manager Id (Enter NULL if employee is manager):', answers => answers.menu == 'update employee manager'),
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
      dbQuery(init, `
        INSERT INTO roles (title, salary, department_id)
        VALUES ('${uiSel.title}',${uiSel.salary},${uiSel.dep_id})
      `);
      break;
    case 'add an employee':
      dbQuery(init, `
        INSERT INTO employees (first_name, last_name, role_id, manager_id) 
        VALUES ('${uiSel.f_name}','${uiSel.l_name}',${uiSel.r_id},${uiSel.m_id})
      `);
      break;
    case 'update an employee role':
      dbQuery(init, `UPDATE employees SET role_id=${uiSel.emp_r} WHERE id=${uiSel.emp_id}`);
      break;
    case 'update employee manager':
      dbQuery(init, `UPDATE employees SET manager_id=${uiSel.m_id} WHERE id=${uiSel.emp_id}`);
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