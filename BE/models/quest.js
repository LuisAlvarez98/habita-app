const mongoose = require("mongoose");

const questSchema = {
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
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
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
};

const Quest = mongoose.model("Quest", questSchema);
module.exports = Quest;
