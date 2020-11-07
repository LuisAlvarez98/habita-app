const express = require("express");
const bodyParser = require("body-parser");
const HabitController = require("../controllers/habit");

const router = express.Router();
const jsonParser = bodyParser.json();

router.post("/api/habit", jsonParser, HabitController.createHabit);
router.get("/api/habits/:id", jsonParser, HabitController.getHabits);

module.exports = router;
