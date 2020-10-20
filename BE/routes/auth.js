const express = require("express");
const bodyParser = require("body-parser");
const AuthController = require("../controllers/auth");

const router = express.Router();
const jsonParser = bodyParser.json();

router.post("/api/user/register", jsonParser, AuthController.register);
router.post("/api/user/login", jsonParser, AuthController.login);

module.exports = router;
