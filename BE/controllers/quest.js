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
    status: "Not completed",
    title: "Dormir 8 horas.",
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
    status: "Not completed",
    title: "Hacer 1 hora de ejercicio.",
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
    status: "Not completed",
    title: "Leer 15 paginas.",
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
    status: "Not completed",
    title: "Tomar 2 litros de agua.",
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
    status: "Not completed",
    title: "Toma una caminata, sal al aire libre.",
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
    status: "Not completed",
    title: "Planta un arbol.",
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
    status: "Not completed",
    title: "Haz 10 sentadillas.",
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
    status: "Not completed",
    title: "Haz 10 abdominales.",
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
    status: "Not completed",
    title: "Platica con tus amigos o familia.",
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
    status: "Not completed",
    title: "Regalate algo, te lo merces!",
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
    status: "Not completed",
    title: "Desayuna saludabe.",
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
    status: "Not completed",
    title: "Busca inspiracion.",
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
    status: "Not completed",
    title: "Aprende algo nuevo.",
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
    status: "Not completed",
    title: "Enfrenta un miedo.",
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
    status: "Not completed",
    title: "Organiza tus tareas para hoy y el siguiente dia.",
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
    status: "Not completed",
    title: "Tomar vitaminas y minerales.",
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
