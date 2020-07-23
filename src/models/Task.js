const mongoose = require("mongoose");

// ============= TASK API =================
const Task = mongoose.model("Task", {
  title: {
    type: String,
    trim: true,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

// const taskOne = new Task({
//   title: "Learn Validator",
//   password: "921Amway",
//   completed: false,
// });

// taskOne
//   .save()
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

module.exports = Task;
