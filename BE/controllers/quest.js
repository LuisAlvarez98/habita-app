const { getFips } = require("crypto");
const jwt = require("jsonwebtoken");
const Quest = require("../models/quest");
const QuestModel = require("../models/quest");
const ProfileModel = require("../models/profile");

const quests = [
  {
    _id: 1,
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
    _id: 2,
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
    _id: 3,
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
    _id: 4,
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
    _id: 5,
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
    _id: 6,
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
    _id: 7,
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

let selectedQuests = [
  {
    _id: 1,
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
    _id: 2,
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
];

exports.getQuests = async (req, res) => {
  try {
    return res.status(200).json(selectedQuests);
  } catch (e) {
    return res.status(404).json({ message: "No quests found" });
  }
};


exports.completeQuest = async (req, res) =>{
  let { questID, UId } = req.params;
  let quest = await QuestModel.findById(questID);
  if(quest == null)
    return res.status(404).json({ message: "Quest not found." });
  
  if(quest.status === "Completed"){
    quest.status = "Not completed";
    let user = await ProfileModel.findOne({user: UId}).exec();
    const newProfile = await ProfileModel.updateOne({user: UId}, {$pull:{completedQuests:{_id:quest._id}}}, { multi: true });
  }
  else{
    quest.status = "Completed";
    let user = await ProfileModel.findOne({user: UId}).exec();
    const newProfile = await ProfileModel.updateOne({user: UId}, {$push:{completedQuests: quest}});
  }

  const newQuest = await QuestModel.updateOne({_id: questID}, quest);
  return res.status(200).json({ message: "Quest status changed." });

}

exports.setNewQuests = async (req, res) => {
  console.log("Quests changed");
  let newQuests = [];
  let questOne = quests[Math.floor(Math.random() * quests.length)];
  let questTwo = quests[Math.floor(Math.random() * quests.length)];

  while (questOne._id === questTwo._id) {
    questOne = quests[Math.floor(Math.random() * quests.length)];
    console.log("Quest is the same");
  }

  newQuests.push(questOne);
  newQuests.push(questTwo);
  selectedQuests = newQuests;
};

