const mongoose = require("mongoose");

const habitSchema = {
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  userId: {
    type: "ObjectId",
    ref: "User",
    required: true,
  },
};

const Habit = mongoose.model("Habit", habitSchema);
module.exports = Habit;
