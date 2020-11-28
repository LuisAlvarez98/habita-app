require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("./middleware/cors");

const authRoutes = require("./routes/auth");
const habitRoutes = require("./routes/habit");
const userRoutes = require("./routes/user");
const questRoutes = require("./routes/quest");

/** Setup Mongoose */
mongoose.connect("mongodb://localhost/habita", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

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

app.get("/", function (req, res) {
  res.send("Welcome to Habita, API working");
});

app.all("*", (req, res) => {
  console.log("not found");
  res.statusMessage = "Route not found";
  res.status(404).end();
});

/** Init */

db.once("open", () => {
  console.log("Connected to the db");
  app.listen(8080, () => {
    console.log("The server is running on port 8080");
  });
});

db.on("error", () => {
  console.log("DB connection error");
});
