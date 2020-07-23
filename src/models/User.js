const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
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

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }

  next();
});

// ============= USER API =================
const User = mongoose.model("User", userSchema);

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
