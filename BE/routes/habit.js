const express = require("express");
const bodyParser = require("body-parser");
const HabitController = require("../controllers/habit");

const router = express.Router();
const jsonParser = bodyParser.json();

router.post("/api/habit", jsonParser, HabitController.createHabit);
router.get("/api/habits/:id", jsonParser, HabitController.getHabits);
router.delete("/api/habit/:id", jsonParser, HabitController.deleteHabit);
router.put("/api/habit/:id", jsonParser, HabitController.updateHabit);
router.put("/api/habit/confirm/:id", jsonParser, HabitController.completeHabit);

module.exports = router;
