const mongoose = require("mongoose");

const habitSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: 1,
    trim: true,
  },

  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  habits: {
    type: [habitSchema],
  },
});

const bcrypt = require("bcrypt");
let SALT = 10;

//HASHING PASSWORD BEFORE SAVING INTO Database
userSchema.pre("save", function (next) {
  let user = this;

  if (user.isModified("password")) {
    bcrypt.genSalt(SALT, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (
  candidatePassword,
  checkPassword
) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return checkPassword(err);
    checkPassword(null, isMatch);
  });
};

const User = mongoose.model("User", userSchema);
module.exports = { User };
