const mongoose = require("mongoose");
const Habit = require('./habit');
const Quest = require('./quest');

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
  completedHabits:{
    type: Array,
    default: [],
  },
  completedQuests:{
    type: Array,
    default: [],
  }
});

const Profile = mongoose.model("Profile", profileSchema);
module.exports = Profile;
