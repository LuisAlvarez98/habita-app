const { getFips } = require("crypto");
const jwt = require("jsonwebtoken");
const HabitModel = require("../models/habit");
const ProfileModel = require("../models/profile");

const MULT_EXP = 1.2;
const MULT_COINS = 0.8;

exports.createHabit = async (req, res) => {
  const values = req.body;
  if (values.frequency.length >= 5) {
    values.fequencyDescription = "daily";
  } else {
    values.fequencyDescription = "weekly";
  }

  const coins = calculateCoins(values.duration);
  const exp = calculateExp(values.duration);

  values.coins = coins;
  values.exp = exp;
  const newHabit = new HabitModel(values);
  try {
    await newHabit.save();
  } catch (e) {
    res.statusMessage = "Error registering new habit";
    return res.status(400).end();
  }
  return res.status(200).json(newHabit);
};

const calculateCoins = (duration) => {
  const durationNum = parseInt(duration);

  return parseInt(MULT_COINS * durationNum);
};
const calculateExp = (duration) => {
  const durationNum = parseInt(duration);
  return parseInt(MULT_EXP * durationNum);
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
    const habit = await HabitModel.findById({ _id: id });
    if (habit.length <= 0)
      return res.status(404).json({ message: "Habit does not exit" });

      const newProfile = await ProfileModel.updateOne(
        { user: habit.userId },
        { $pull: { completedHabits: { _id: habit._id } } },
        { multi: true }
      );

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
    habitBody.coins = calculateCoins(habitBody.duration);
    habitBody.exp = calculateExp(habitBody.duration);

    if (habitBody.frequency.length >= 5) {
      habitBody.fequencyDescription = "daily";
    } else {
      habitBody.fequencyDescription = "weekly";
    }
  const newHabit = await HabitModel.updateOne({ _id: id }, habitBody);

  return res.status(200).json({ message: "Habit updated successfully." });
};

exports.completeHabit = async (req, res) => {
  let { id } = req.params;
  let habit = await HabitModel.findById(id);
  if (habit == null)
    return res.status(404).json({ message: "Habit not found." });

  if (habit.status === "Completed") {
    habit.status = "Not completed";
    let UId = habit.userId;
    let user = await ProfileModel.findOne({ user: UId }).exec();
    user.experience -= habit.exp;
    user.coins -= habit.coins;

    if (user.experience < getCurrentExpGoal(user.level) && user.level > 1) {
      user.level -= 1;
      console.log("leveld down");
    }

    const userwithcoins = await ProfileModel.updateOne({ user: UId }, user);
    const newProfile = await ProfileModel.updateOne(
      { user: UId },
      { $pull: { completedHabits: { _id: habit._id } } },
      { multi: true }
    );
  } else {
    habit.status = "Completed";
    let UId = habit.userId;
    let user = await ProfileModel.findOne({ user: UId }).exec();
    user.experience += habit.exp;
    user.coins += habit.coins;
    console.log(user.level);

    while (user.experience >= getCurrentExpGoal(user.level)) {
      user.level += 1;
      console.log("leveld up");
    }

    const userwithcoins = await ProfileModel.updateOne({ user: UId }, user);
    const newProfile = await ProfileModel.updateOne(
      { user: UId },
      { $push: { completedHabits: habit } }
    );
  }

  const newHabit = await HabitModel.updateOne({ _id: id }, habit);

  return res.status(200).json({ message: "Habit status changed." });
};


exports.refreshHabits = async () => {
  let days = ["Domingo","Lunes","Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
  let today = new Date()
  let habits = await HabitModel.find();
  habits.forEach(async (item) => { 
    let found = item.frequency.find(d => d === days[today.getDay()]);
    if(found){
    item.status = "Not completed"; 
    }
    if(today > item.endDate){
      let y  = await item.delete();
    }else{
      let x = await item.save();
    }
  });
}

const getCurrentExpGoal = (level) => {
  return level * 300 * 1.2;
};
