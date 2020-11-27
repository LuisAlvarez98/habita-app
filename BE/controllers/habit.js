const { getFips } = require("crypto");
const jwt = require("jsonwebtoken");
const HabitModel = require("../models/habit");

exports.createHabit = async (req, res) => {
  const values = req.body;
  const newHabit = new HabitModel(values);

  try {
    await newHabit.save();
  } catch (e) {
    res.statusMessage = "Error registering new habit";
    return res.status(400).end();
  }
  return res.status(200).json(newHabit);
};

exports.getHabits = async (req, res) => {
  const { id } = req.params;
  try {
    const habits = await HabitModel.find({ userId: id });
    return res.status(200).json(habits);
  } catch (e) {
    return res.status(404).json({ message: "No habits found for this user." });
  }
};

exports.deleteHabit = async (req, res) => {
  let { id } = req.params;
  try {
    const habit = await HabitModel.find({ _id: id });
    if (habit.length <= 0)
      return res.status(404).json({ message: "Habit does not exit" });

    await HabitModel.deleteOne({ _id: id });

    return res.json({ message: "Habit deleted" });
  } catch (e) {
    return res.status(500).send(e);
  }
};

exports.updateHabit = async (req, res) => {
  let habitBody = req.body;
  let { id } = req.params;
  let habit = await HabitModel.findById(id);
  if (habit == null)
    return res.status(404).json({ message: "Habit not found." });

  const newHabit = await HabitModel.updateOne({ _id: id }, habitBody);

  return res.status(200).json({ message: "Habit updated successfully." });
};
