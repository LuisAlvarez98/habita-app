const jwt = require("jsonwebtoken");
const ProfileModel = require("../models/profile");

exports.me = function (req, res) {
  if (req.headers && req.headers.authorization) {
    var authorization = req.headers.authorization.split(" ")[1],
      decoded;
    try {
      decoded = jwt.verify(authorization, process.env.ACCESS_TOKEN_SECRET);
      var userId = decoded._id;
      //Fetch the user by id
      console.log(userId);
      ProfileModel.find({ user: userId }, (err, user) => {
        console.log(user);
      });
      return res.status(200).json({ message: "User found" });
    } catch (e) {
      return res.send("unauthorized");
    }
  }
  return res.status(404).json({ message: "User not found." });
};
