const express = require("express");
const bodyParser = require("body-parser");
const QuestController = require("../controllers/quest");

const router = express.Router();
const jsonParser = bodyParser.json();

router.get("/api/quests", jsonParser, QuestController.getQuests);
router.put("/api/quests/:questID/:userID", jsonParser, QuestController.completeQuest);

module.exports = router;
