const mongoose = require("mongoose");
const validator = require("validator");
mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewUrlParser: true,
  useCreateIndex: true
});

const Task = mongoose.model("Task", {
  task: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    required: false,
    default: false
  }
});

// const toDo = {
//   task: "Please visit Harry",
//   completed: false
// };
// const task1 = new Task(toDo);
// task1
//   .save()
//   .then(result => console.log(result))
//   .catch(error => error);
