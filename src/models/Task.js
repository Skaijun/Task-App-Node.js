const mongoose = require("mongoose");

// ============= TASK API =================
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);

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
