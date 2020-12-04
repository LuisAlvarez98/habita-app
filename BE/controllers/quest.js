const { getFips } = require("crypto");
const jwt = require("jsonwebtoken");
const Quest = require("../models/quest");
const QuestModel = require("../models/quest");
const ProfileModel = require("../models/profile");

const quests = [
  {
    taskType: "Mindfulness",
    status: "Not completed",
    title: "Correr 5 kilometros.",
    description: "12",
    coins: 100,
    exp: 100,
    duration: "120",
    startDate: "2020-11-28T04:46:24.852Z",
    endDate: "2020-11-28T04:46:24.852Z",
    fequencyDescription: "weekly",
  },
  {
    taskType: "Mindfulness",
    status: "Dormir 8 horas.",
    title: "Quest 2",
    description: "12",
    coins: 100,
    exp: 100,
    duration: "120",
    startDate: "2020-11-28T04:46:24.852Z",
    endDate: "2020-11-28T04:46:24.852Z",
    fequencyDescription: "weekly",
  },
  {
    taskType: "Mindfulness",
    status: "Hacer 1 hora de ejercicio.",
    title: "Quest 3",
    description: "12",
    coins: 100,
    exp: 100,
    duration: "120",
    startDate: "2020-11-28T04:46:24.852Z",
    endDate: "2020-11-28T04:46:24.852Z",
    fequencyDescription: "weekly",
  },
  {
    taskType: "Mindfulness",
    status: "Leer 15 paginas.",
    title: "Quest 4",
    description: "12",
    coins: 100,
    exp: 100,
    duration: "120",
    startDate: "2020-11-28T04:46:24.852Z",
    endDate: "2020-11-28T04:46:24.852Z",
    fequencyDescription: "weekly",
  },
  {
    taskType: "Mindfulness",
    status: "Tomar 2 litros de agua.",
    title: "Quest 5",
    description: "12",
    coins: 100,
    exp: 100,
    duration: "120",
    startDate: "2020-11-28T04:46:24.852Z",
    endDate: "2020-11-28T04:46:24.852Z",
    fequencyDescription: "weekly",
  },
  {
    taskType: "Mindfulness",
    status: "Toma una caminata, sal al aire libre.",
    title: "Quest 6",
    description: "12",
    coins: 100,
    exp: 100,
    duration: "120",
    startDate: "2020-11-28T04:46:24.852Z",
    endDate: "2020-11-28T04:46:24.852Z",
    fequencyDescription: "weekly",
  },
  {
    taskType: "Mindfulness",
    status: "Planta un arbol.",
    title: "Quest 7",
    description: "12",
    coins: 100,
    exp: 100,
    duration: "120",
    startDate: "2020-11-28T04:46:24.852Z",
    endDate: "2020-11-28T04:46:24.852Z",
    fequencyDescription: "weekly",
  },
  {
    taskType: "Mindfulness",
    status: "Haz 10 sentadillas.",
    title: "Quest 8",
    description: "12",
    coins: 100,
    exp: 100,
    duration: "120",
    startDate: "2020-11-28T04:46:24.852Z",
    endDate: "2020-11-28T04:46:24.852Z",
    fequencyDescription: "weekly",
  },
  {
    taskType: "Mindfulness",
    status: "Haz 10 abdominales.",
    title: "Quest 9",
    description: "12",
    coins: 100,
    exp: 100,
    duration: "120",
    startDate: "2020-11-28T04:46:24.852Z",
    endDate: "2020-11-28T04:46:24.852Z",
    fequencyDescription: "weekly",
  },
  {
    taskType: "Mindfulness",
    status: "Platica con tus amigos o familia.",
    title: "Quest 10",
    description: "12",
    coins: 100,
    exp: 100,
    duration: "120",
    startDate: "2020-11-28T04:46:24.852Z",
    endDate: "2020-11-28T04:46:24.852Z",
    fequencyDescription: "weekly",
  },
  {
    taskType: "Mindfulness",
    status: "Regalate algo, te lo merces!",
    title: "Quest 11",
    description: "12",
    coins: 100,
    exp: 100,
    duration: "120",
    startDate: "2020-11-28T04:46:24.852Z",
    endDate: "2020-11-28T04:46:24.852Z",
    fequencyDescription: "weekly",
  },
  {
    taskType: "Mindfulness",
    status: "Desayuna saludabe.",
    title: "Quest 12",
    description: "12",
    coins: 100,
    exp: 100,
    duration: "120",
    startDate: "2020-11-28T04:46:24.852Z",
    endDate: "2020-11-28T04:46:24.852Z",
    fequencyDescription: "weekly",
  },
  {
    taskType: "Mindfulness",
    status: "Busca inspiracion.",
    title: "Quest 13",
    description: "12",
    coins: 100,
    exp: 100,
    duration: "120",
    startDate: "2020-11-28T04:46:24.852Z",
    endDate: "2020-11-28T04:46:24.852Z",
    fequencyDescription: "weekly",
  },
  {
    taskType: "Mindfulness",
    status: "Aprende algo nuevo.",
    title: "Quest 14",
    description: "12",
    coins: 100,
    exp: 100,
    duration: "120",
    startDate: "2020-11-28T04:46:24.852Z",
    endDate: "2020-11-28T04:46:24.852Z",
    fequencyDescription: "weekly",
  },
  {
    taskType: "Mindfulness",
    status: "Enfrenta un miedo.",
    title: "Quest 15",
    description: "12",
    coins: 100,
    exp: 100,
    duration: "120",
    startDate: "2020-11-28T04:46:24.852Z",
    endDate: "2020-11-28T04:46:24.852Z",
    fequencyDescription: "weekly",
  },
  {
    taskType: "Mindfulness",
    status: "Organiza tus tareas para hoy y el siguiente dia.",
    title: "Quest 16",
    description: "12",
    coins: 100,
    exp: 100,
    duration: "120",
    startDate: "2020-11-28T04:46:24.852Z",
    endDate: "2020-11-28T04:46:24.852Z",
    fequencyDescription: "weekly",
  },
  {
    taskType: "Mindfulness",
    status: "Tomar vitaminas y minerales.",
    title: "Quest 17",
    description: "12",
    coins: 100,
    exp: 100,
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
  let user = await ProfileModel.findOne({ user: userID }).exec();

  let quest = await QuestModel.findById(questID);
  if (quest == null)
    return res.status(404).json({ message: "Quest not found." });

  let isQuestThere = findQuest(user.completedQuests, questID);
  console.log(isQuestThere);
  if (isQuestThere) {
    user.experience -= quest.exp;
    user.coins -= quest.coins;
    if (user.experience < getCurrentExpGoal(user.level) && user.level > 1) {
      user.level -= 1;
      console.log("leveld down");
    }
    const userwithcoins = await ProfileModel.updateOne({ user: userID }, user);
    const newProfile = await ProfileModel.updateOne(
      { user: userID },
      { $pull: { completedQuests: { _id: quest._id } } },
      { multi: true }
    );
  } else {
    user.experience += quest.exp;
    user.coins += quest.coins;
    while (user.experience >= getCurrentExpGoal(user.level)) {
      user.level += 1;
      console.log("leveld up");
    }
    const userwithcoins = await ProfileModel.updateOne({ user: userID }, user);
    const newProfile = await ProfileModel.updateOne(
      { user: userID },
      { $push: { completedQuests: quest } }
    );
  }

  //const newQuest = await QuestModel.updateOne({ _id: questID }, quest);
  return res.status(200).json({ message: "Quest status changed." });
};

const findQuest = (questList, id) => {
  let ans = false;
  questList.forEach((q) => {
    console.log(id);
    console.log(q._id.toString());
    if (q._id.toString() === id) {
      ans = true;
    }
  });
  return ans;
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

const getCurrentExpGoal = (level) => {
  return level * 300 * 1.2;
};
