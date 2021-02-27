const mongoose = require("mongoose");
const validator = require("validator");

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true
});

const TaskS = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true
    },
    completed: {
      type: Boolean,
      required: false,
      default: false
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);

const Task = mongoose.model("tasks", TaskS);

module.exports = Task;
