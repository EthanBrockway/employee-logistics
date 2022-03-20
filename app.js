const inquirer = require("inquirer");
const db = require("./db/connection.js");
const cTable = require("console.table");
console.table([
  {
    name: "foo",
    age: 10,
  },
  {
    name: "bar",
    age: 20,
  },
]);

departmentPrompt();
