const express = require("express");
const bodyParser = require("body-parser");
const UserController = require("../controllers/user");

const router = express.Router();
const jsonParser = bodyParser.json();

router.get("/api/user/me", jsonParser, UserController.me);
router.get("/api/user/info/:id", jsonParser, UserController.getUserInfo);
router.put("/api/user/:id", jsonParser, UserController.updateInfo);

module.exports = router;
