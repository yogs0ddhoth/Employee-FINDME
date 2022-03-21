DROP DATABASE IF EXISTS findme_db;
CREATE DATABASE findme_db;

USE findme_db;

CREATE TABLE department (
  id INT NOT NULL PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
  id INT NOT NULL PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(6,2) NOT NULL,
  department_id INT,

  FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL
);

CREATE TABLE employee (
  id INT NOT NULL PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT REFERENCES employee(id) ON DELETE SET NULL,

  FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE SET NULL
);