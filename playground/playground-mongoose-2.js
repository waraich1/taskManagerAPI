require("../src/db/mongoose");
const Task = require("../src/db/models/task");
// const id = "60308f09573cf8190f5149f1";
const taskToDel = { task: "Please visit Harry" };

const deleteTask = async id => {
  const userDel = await Task.findByIdAndDelete(id);
  const res = await Task.countDocuments({ completed: false });

  return res;
};

deleteTask("6030aaa246800e26e4d3c566")
  .then(result => console.log(result))
  .catch(e => e);

// Task.findByIdAndDelete(id, taskToDel)
//   .then(task => {
//     console.log(task);
//     return Task.countDocuments({ completed: false });
//   })
//   .then(result => {
//     console.log(result);
//   })
//   .then(e => e);
