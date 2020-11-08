const mongoose = require("mongoose");

const habitSchema = {
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  duration: {
    type: String,
  },
  taskType: {
    type: String,
    enum: ["Mindfulness", "School", "Fitness", "Personal", "Other"],
    default: "Mindfulness",
  },
  frequency: {
    type: [],
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  streak: {
    type: Number,
  },
  coins: {
    type: Number,
  },
  exp: {
    type: Number,
  },
  status: {
    type: String,
    enum: ["Not completed", "Completed"],
    default: "Not completed",
  },
  userId: {
    type: "ObjectId",
    ref: "User",
    required: true,
  },
};

const Habit = mongoose.model("Habit", habitSchema);
module.exports = Habit;
