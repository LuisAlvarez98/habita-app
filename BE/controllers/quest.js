const { getFips } = require("crypto");
const jwt = require("jsonwebtoken");
const Quest = require("../models/quest");
const QuestModel = require("../models/quest");
const ProfileModel = require("../models/profile");

const quests = [
  {
    taskType: "Mindfulness",
    status: "Not completed",
    title: "Quest 1",
    description: "12",
    coins: 100,
    duration: "120",
    startDate: "2020-11-28T04:46:24.852Z",
    endDate: "2020-11-28T04:46:24.852Z",
    fequencyDescription: "weekly",
  },
  {
    taskType: "Mindfulness",
    status: "Not completed",
    title: "Quest 2",
    description: "12",
    coins: 100,
    duration: "120",
    startDate: "2020-11-28T04:46:24.852Z",
    endDate: "2020-11-28T04:46:24.852Z",
    fequencyDescription: "weekly",
  },
  {
    taskType: "Mindfulness",
    status: "Not completed",
    title: "Quest 3",
    description: "12",
    coins: 100,
    duration: "120",
    startDate: "2020-11-28T04:46:24.852Z",
    endDate: "2020-11-28T04:46:24.852Z",
    fequencyDescription: "weekly",
  },
  {
    taskType: "Mindfulness",
    status: "Not completed",
    title: "Quest 4",
    description: "12",
    coins: 100,
    duration: "120",
    startDate: "2020-11-28T04:46:24.852Z",
    endDate: "2020-11-28T04:46:24.852Z",
    fequencyDescription: "weekly",
  },
  {
    taskType: "Mindfulness",
    status: "Not completed",
    title: "Quest 5",
    description: "12",
    coins: 100,
    duration: "120",
    startDate: "2020-11-28T04:46:24.852Z",
    endDate: "2020-11-28T04:46:24.852Z",
    fequencyDescription: "weekly",
  },
  {
    taskType: "Mindfulness",
    status: "Not completed",
    title: "Quest 6",
    description: "12",
    coins: 100,
    duration: "120",
    startDate: "2020-11-28T04:46:24.852Z",
    endDate: "2020-11-28T04:46:24.852Z",
    fequencyDescription: "weekly",
  },
  {
    taskType: "Mindfulness",
    status: "Not completed",
    title: "Quest 7",
    description: "12",
    coins: 100,
    duration: "120",
    startDate: "2020-11-28T04:46:24.852Z",
    endDate: "2020-11-28T04:46:24.852Z",
    fequencyDescription: "weekly",
  },
];

let selectedQuests = [{}];

exports.createQuests = async (req, res) => {
  //QuestModel.deleteAll({});
  quests.forEach((item) => {
    const newQuest = new QuestModel(item);
    newQuest.save();
  });
};

exports.getQuests = async (req, res) => {
  try {
    return res.status(200).json(selectedQuests);
  } catch (e) {
    return res.status(404).json({ message: "No quests found" });
  }
};

exports.completeQuest = async (req, res) => {
  let { questID, userID } = req.params;
  let quest = await QuestModel.findById(questID);
  if (quest == null)
    return res.status(404).json({ message: "Quest not found." });

  if (quest.status === "Completed") {
    quest.status = "Not completed";
    let user = await ProfileModel.findOne({ user: userID }).exec();
    user.experience -= quest.exp;
    user.coins -= quest.coins;
    const userwithcoins = await ProfileModel.updateOne({user: userID}, user);
    const newProfile = await ProfileModel.updateOne(
      { user: userID },
      { $pull: { completedQuests: { _id: quest._id } } },
      { multi: true }
    );
  } else {
    quest.status = "Completed";
    let user = await ProfileModel.findOne({ user: userID }).exec();
    user.experience += quest.exp;
    user.coins += quest.coins;
    const userwithcoins = await ProfileModel.updateOne({user: userID}, user);
    const newProfile = await ProfileModel.updateOne(
      { user: userID },
      { $push: { completedQuests: quest } }
    );
  }

  const newQuest = await QuestModel.updateOne({ _id: questID }, quest);
  return res.status(200).json({ message: "Quest status changed." });
};

exports.setNewQuests = async (req, res) => {
  QuestModel.find({}, function (err, quests) {
    const questsList = quests;
    let newQuests = [];

    if (questsList.length != 0) {
      let questOne = questsList[Math.floor(Math.random() * questsList.length)];
      let questTwo = questsList[Math.floor(Math.random() * questsList.length)];

      while (questOne._id === questTwo._id) {
        questOne = questsList[Math.floor(Math.random() * questsList.length)];
        console.log("Quest is the same");
      }

      newQuests.push(questOne);
      newQuests.push(questTwo);
      selectedQuests = newQuests;
    }
  });
};
