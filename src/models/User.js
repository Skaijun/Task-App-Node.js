const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
    unique: true,
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
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.methods.toJSON = function () {
  const user = this;
  const userObj = user.toObject();
  delete userObj.password;
  delete userObj.tokens;
  return userObj;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "thisistoauthstring");
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.statics.findByLoginData = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Error! Wrong login data!");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Error! Wrong login data!");
  }
  return user;
};

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
