const inquirer = require("inquirer");
const db = require("./db/connection.js");

function startPrompt() {
  return inquirer
    .prompt({
      type: "list",
      name: "selectPrompt",
      message: "What would you like to do?",
      choices: [
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "Add a Department",
        "Add a Role",
        "Add an Employee",
        "Update an Employee Role",
        "Exit",
      ],
    })
    .then((choice) => {
      if (choice.selectPrompt === "View All Departments") {
        const sql = `SELECT * FROM departments;`;
        createTable(sql, null);
      } else if (choice.selectPrompt === "View All Roles") {
        const sql = `SELECT * from roles LEFT JOIN departments ON roles.id=departments.id`;
        createTable(sql, null);
      } else if (choice.selectPrompt === "View All Employees") {
        const sql = `SELECT a.id, a.first_name, a.last_name, CONCAT(b.first_name, ' ', b.last_name) AS 'manager', roles.title AS 'role', roles.salary AS 'salary', departments.name as 'departments'
        FROM employees a
        LEFT OUTER JOIN employees b ON a.manager_id = b.id
        JOIN roles ON a.role_id = roles.id
        JOIN departments ON roles.department_id = departments.id`;
        createTable(sql, null);
      } else if (choice.selectPrompt === "Add a Department") {
        addDepartment();
      } else if (choice.selectPrompt === "Add a Role") {
        addRole();
      } else if (choice.selectPrompt === "Add an Employee") {
        addEmployee();
      } else if (choice.selectPrompt === "Update an Employee Role") {
        updateEmployee();
      } else if (choice.selectPrompt === "Exit") {
        return;
      }
    });
}
//
function addDepartment() {
  return inquirer
    .prompt({
      type: "input",
      name: "depName",
      message: "Please add a department name",
    })
    .then((object) => {
      let { depName } = object;
      const sql = `INSERT INTO departments (name) VALUES (?)`;
      const params = depName;

      db.query(sql, params, (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log("Added department!");
      });
    });
}

function createTable(query, param) {
  db.query(query, param, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.table(result);
  });
}
startPrompt();
