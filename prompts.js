function departmentPrompt() {
  return inquirer
    .prompt({
      type: "checkbox",
      name: "depName",
      message: "Please add a department name",
    })
    .then((object) => {
      const { depName } = object;
      console.log(depName);
    });
}
module.exports = departmentPrompt();
