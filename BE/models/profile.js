const mongoose = require("mongoose");

const profileSchema = mongoose.Schema({
  fullName: {
    type: String,
  },
  level: {
    type: Number,
    default: 1,
  },
  hitpoints: {
    type: Number,
    default: 100,
  },
  experience: {
    type: Number,
    default: 0,
  },
  coins: {
    type: Number,
    default: 0,
  },
  user: {
    type: "ObjectId",
    ref: "User",
    required: true,
    unique: 1,
  },
});

const Profile = mongoose.model("Profile", profileSchema);
module.exports = Profile;
