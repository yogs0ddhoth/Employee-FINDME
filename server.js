// require dependancies
const inquirer = require('inquirer');

// require modules:
const { Input, List } = require('./lib/prompts'); // prompt objects
const queryDb = require('./lib/db'); // database handler

// UI functionality
const menu = [
  'view all departments',
  'view all roles',
  'view all employees',
  'view department budget',
  'add a department',
  'add a role',
  'add an employee',
  'update an employee role',
  'update employee manager',
  'delete a department',
  'delete a role',
  'delete an employee',
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

  // If 'view department budget' is selected:
  new Input('dep_name', 'Enter Department Name:', answers => answers.menu == 'view department budget'),

  // If 'update an employee role' is selected:
  new Input('emp_id', 'Enter Employee Id:', answers => answers.menu == 'update an employee role'),
  new Input('emp_r', 'Enter new Role Id:', answers => answers.menu == 'update an employee role'),

  // If 'update employee manager' is selected:
  new Input('emp_id', 'Enter Employee Id:', answers => answers.menu == 'update employee manager'),
  new Input('m_id', 'Enter Manager Id (Enter NULL if employee is manager):', answers => answers.menu == 'update employee manager'),
  
  // 'If delete a department' is selected:
  new Input('dep_id', 'Enter Department Id:', answers => answers.menu == 'delete a department'),
  
  // 'If delete a role' is selected:
  new Input('r_id', 'Enter Role Id:', answers => answers.menu == 'delete a role'),
  
  // 'If delete an employee' is selected:
  new Input('emp_id', 'Enter Employee Id:', answers => answers.menu == 'delete an employee')
];

// Main functionality 
const init = async () => {
  const uiSel = await inquirer.prompt(MenuPrompt);
  // handle prompt response
  switch (uiSel.menu) {
    // call database query
    case 'view all departments':
      queryDb('SELECT * FROM departments', init);
      break;

    case 'view all roles':
      queryDb(`
        SELECT r.id, r.title, r.salary, d.name department 
        FROM roles r LEFT JOIN departments d ON r.department_id = d.id`, init);
      break;

    case 'view all employees':
      queryDb(`
        SELECT e.id, e.first_name, e.last_name, r.title, e.manager_id, r.salary, d.name department 
        FROM employees e LEFT JOIN roles r ON e.role_id = r.id LEFT JOIN departments d ON r.department_id = d.id`, init);
      break;

    case 'view department budget':
      queryDb(`
        SELECT d.name Department_Name, SUM(salary) Budget 
        FROM departments d LEFT JOIN roles r ON r.department_id = d.id LEFT JOIN employees e ON e.role_id = r.id 
        WHERE d.name='${uiSel.dep_name}'
        `, init);
      break;

    case 'add a department':
      queryDb(`INSERT INTO departments (name) VALUES ('${uiSel.name}')`, init);
      break;

    case 'add a role':
      queryDb(`
        INSERT INTO roles (title, salary, department_id)
        VALUES ('${uiSel.title}',${uiSel.salary},${uiSel.dep_id})
        `, init);
      break;

    case 'add an employee':
      queryDb(`
        INSERT INTO employees (first_name, last_name, role_id, manager_id) 
        VALUES ('${uiSel.f_name}','${uiSel.l_name}',${uiSel.r_id},${uiSel.m_id})
        `, init);
      break;

    case 'update an employee role':
      queryDb(`UPDATE employees SET role_id=${uiSel.emp_r} WHERE id=${uiSel.emp_id}`, init);
      break;

    case 'update employee manager':
      queryDb(`UPDATE employees SET manager_id=${uiSel.m_id} WHERE id=${uiSel.emp_id}`, init);
      break;

    case 'delete a department':
      queryDb(`DELETE FROM departments WHERE id=${uiSel.dep_id}`, init);
      break;

    case 'delete a role':
      queryDb(`DELETE FROM roles WHERE id=${uiSel.r_id}`, init);
      break;

    case 'delete an employee':
      queryDb(`DELETE FROM employees WHERE id=${uiSel.emp_id}`, init);
      break;
      
    case 'exit':
      process.exit(0);
  }
};

init();
