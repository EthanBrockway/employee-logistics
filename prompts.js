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
        const sql = `SELECT roles.id, roles.title, roles.salary, departments.name AS department_name from roles JOIN departments ON departments.id = roles.department_id`;
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

function addRole() {
  db.query("select * from departments", (err, result) => {
    if (err) {
      console.log(err);
      return Prompt();
    }
    let departmentList = [];
    for (let i = 0; i < result.length; i++) {
      departmentList.push(result[i].name);
    }
    inquirer
      .prompt([
        {
          type: "input",
          name: "role",
          message: "What is the new Role?",
        },
        {
          type: "input",
          name: "salary",
          message: "What is the salary of this role?",
        },
        {
          type: "list",
          name: "department",
          message: "Which Department does this Role belong to?",
          choices: departmentList,
        },
      ])
      .then((answer) => {
        const role = answer.role;
        const salary = answer.salary;
        const { id } = result.find(
          (department) =>
            department.name.toLowerCase() === answer.department.toLowerCase()
        );
        const squad = id;
        let params = [role, salary, squad];
        const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`;

        db.query(sql, params, (err, result) => {
          if (err) {
            console.log(err);
            return startPrompt();
          }
          console.log("Added new role!");
        });
      });
  });
}

function addEmployee() {
  // get results from query of employees
  // get results from query of roles
  // before inserting check if user input = the employee enrolled
  db.query(`SELECT * FROM employees`, (err, employeeResult) => {
    let managerList = [];
    for (let i = 0; i < employeeResult.length; i++) {
      managerList.push(employeeResult[i].id);
    }
    managerList.push("No Manager");
    db.query("SELECT * FROM roles", (err, roleResult) => {
      let roleNames = [];
      for (i = 0; i < roleResult.length; i++) {
        roleNames.push(roleResult[i].id);
      }
      inquirer
        .prompt([
          {
            type: "input",
            name: "first",
            message: "What is the employee's first name?",
          },
          {
            type: "input",
            name: "last",
            message: "What is the employee's last name?",
          },
          {
            type: "list",
            name: "role",
            message: "What is this Employee's Role?",
            choices: roleNames,
          },
          {
            type: "list",
            name: "manager",
            message: "Who is this Employee's Manager?",
            choices: managerList,
          },
        ])
        .then((answer) => {
          const { first, last, role, manager } = answer;
          const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
          const params = [first, last, role, manager];

          db.query(sql, params, (err, result) => {
            if (err) {
              console.log(err);
            }
            console.log("Role added!");
          });
        });
    });
  });
}
function updateEmployee() {
  db.query("SELECT * FROM employees", (err, employeeResult) => {
    let employeeNames = [];
    for (let i = 0; i < employeeResult.length; i++) {
      employeeNames.push(employeeResult[i].id);
    }
    db.query("select * from roles", (err, roleResult) => {
      let roleList = [];
      for (i = 0; i < roleResult.length; i++) roleList.push(roleResult[i].id);
      inquirer
        .prompt([
          {
            type: "list",
            name: "employeeName",
            message: "Which Employee would you like to change?",
            choices: employeeNames,
          },
          {
            type: "list",
            name: "role",
            message: "What is the new role for this employee?",
            choices: roleList,
          },
        ])
        .then((answer) => {
          const { employeeName, role } = answer;
          const sql = `UPDATE employees SET role_id = ? WHERE id = ?`;
          const params = [employeeName, role];

          db.query(sql, params, (err, result) => {
            if (err) {
              console.log(err);
            }
            console.log("Updated Employee!");
          });
        });
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
