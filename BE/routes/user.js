const express = require("express");
const bodyParser = require("body-parser");
const UserController = require("../controllers/user");

const router = express.Router();
const jsonParser = bodyParser.json();

router.get("/api/user/me", jsonParser, UserController.me);

module.exports = router;
