require("../src/db/mongoose");
const User = require("../src/models/User");

// User.findByIdAndUpdate("5f1710bc4e3cc023dce67281", { name: "Mikhail" })
//   .then((user) => {
//     console.log(user);
//     return User.countDocuments({ age: 1 });
//   })
//   .then((result) => console.log(result))
//   .catch((err) => console.log(err));

const userUpdateAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age });
  const countUsers = await User.countDocuments({ age });
  return countUsers;
};

userUpdateAndCount("5f17107da3982c18d432a48a", 1)
  .then((quantity) => console.log(quantity))
  .catch((err) => console.log(err));
