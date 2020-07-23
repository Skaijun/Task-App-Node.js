const mongoose = require("mongoose");
const validator = require("validator");

// ============= USER API =================
const User = mongoose.model("User", {
  name: { type: String, trim: true, required: true },
  age: {
    type: Number,
    trim: true,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("Age can not be negative");
      }
    },
  },
  email: {
    type: String,
    trim: true,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error();
      }
    },
  },
  password: {
    type: String,
    trim: true,
    required: true,
    minlength: 6,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error('Password can not include "password"');
      }
    },
  },
});

// const user1 = new User({
//   name: "Anna",
//   age: "26",
//   email: "Sii@goose.de",
//   password: "123d921",
// });

// user1
//   .save()
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

module.exports = User;
