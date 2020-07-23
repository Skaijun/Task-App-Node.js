require("../src/db/mongoose");
const Task = require("../src/models/Task");

// Task.findByIdAndDelete("5f17051f25417302ac8fadfc")
//   .then(() => {
//     return Task.countDocuments({ completed: false });
//   })
//   .then((tasks) => console.log(tasks))
//   .catch((err) => console.log(err));

const tasksDeleteAndCount = async (id) => {
  const task = await Task.findByIdAndDelete(id);
  const countUncompleted = await Task.countDocuments({ completed: false });
  return countUncompleted;
};

tasksDeleteAndCount("5f170b664853141424c444e1")
  .then((quantity) => console.log(quantity))
  .catch((err) => console.log(err));
