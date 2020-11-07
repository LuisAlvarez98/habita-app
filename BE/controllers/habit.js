const { getFips } = require("crypto");
const jwt = require("jsonwebtoken");
const HabitModel = require("../models/habit");

exports.createHabit = async (req, res) => {
    const values = req.body;
    const newHabit = new HabitModel(values);
  
    try {
      await newHabit.save();
    } catch (e) {
      res.statusMessage = "Error registering new user";
      return res.status(400).end();
    }
    return res.status(200).json(newHabit);
};

exports.getHabits = async (req, res) => {
    const { id } = req.params;
    try{
        const habits = await HabitModel.find({userId: id})
        return res.status(200).json(habits);
    }catch(e){
       return res.status(404).json({message: "No habits found for this user."});
    }
};
