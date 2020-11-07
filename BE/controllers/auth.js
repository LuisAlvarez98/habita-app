const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");
const generateToken = require("../utils/generateToken");

exports.register = async (req, res) => {
  const values = req.body;
  const newUser = new UserModel(values);

  try {
    await newUser.save();
  } catch (e) {
    res.statusMessage = "Error registering new user";
    return res.status(400).end();
  }

  return res.status(200).json(newUser);
};

exports.login = async (req, res) => {
  UserModel.findOne({ email: req.body.email }, (err, user) => {
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
};
