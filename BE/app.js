// Backend Config
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const jwt = require("jsonwebtoken");
var express = require("express");
var app = express();
app.use(cors());

// Mongoose config
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/habita")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Error", err));

// import models
const { User } = require("./Models/user");

app.use(bodyParser.json()); // to json format

// Authentication
// Register
app.post("/api/user/register", (req, res) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password,
  }).save((err, response) => {
    if (err) res.status(400).send(err);
    res.status(200).send(response);
  });
});
// Login
app.post("/api/user/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.status(404).json({ message: "Login failed, user not found." });

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (err) throw err;
      if (!isMatch) return res.status(400).json({ message: "Wrong password." });

      const accessToken = generateToken(user.toJSON());
      const refreshToken = jwt.sign(
        user.toJSON(),
        process.env.REFRESH_TOKEN_SECRET
      );
      res.status(200).send({ accessToken, refreshToken });
    });
  });
});

// Main endpoint
app.get("/", function (req, res) {
  res.send("Welcome to Habita, API working");
});

// Methods
const authenticateToken = (req, res, nex) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

const generateToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "60m" });
};

app.listen(8080, function () {
  console.log("Listening on port 8080!");
});
