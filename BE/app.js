const dotenv = require("dotenv");
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("./middleware/cors");

const authRoutes = require("./routes/auth");
const habitRoutes = require("./routes/habit");
const userRoutes = require("./routes/user");
const questRoutes = require("./routes/quest");
const QuestController = require("./controllers/quest");

const cron = require("node-cron");
const { refreshHabits } = require("./controllers/habit");

if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: ".env" });
}
const db = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((connection) => {
    console.log("DB connection sucessful!");
  });

app.use(express.static(path.resolve("./FE/app/build")));

/** Setup Mongoose */

//db = mongoose.connection;

/** Setup app */
const app = express();

/** Setup global middlewares */
app.use(cors);
app.use(morgan("dev"));

/** Setup routes */

app.use(authRoutes);
app.use(habitRoutes);
app.use(userRoutes);
app.use(questRoutes);

// Function to create quests TO DO
QuestController.createQuests();
QuestController.setNewQuests();
refreshHabits();

app.get("/", (req, res) => {
  res.sendFile(path.resolve("./FE/app/build/index.html"));
});

app.get("/*", (req, res) => {
  res.sendFile(path.resolve("./FE/app/build/index.html"));
});

app.all("*", (req, res) => {
  console.log("not found");
  res.statusMessage = "Route not found";
  res.status(404).end();
});

/** Init */

/**
 * 
 * db.once("open", () => {
  console.log("Connected to the db");
});

db.on("error", () => {
  console.log("DB connection error");
});

 */

app.listen(8080, () => {
  console.log("The server is running on port 8080");
});

cron.schedule("*/5 * * * *", () => {
  console.log("Habist refreshed");
  refreshHabits();
  QuestController.setNewQuests();
});
