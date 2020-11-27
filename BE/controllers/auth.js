const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");
const generateToken = require("../utils/generateToken");
const ProfileModel = require("../models/profile");

exports.register = async (req, res) => {
  const values = req.body;

  const userBody = {
    email: values.email,
    password: values.password,
  };

  const newUser = new UserModel(userBody);
  const id = newUser._id;

  try {
    await newUser.save();
  } catch (e) {
    res.statusMessage = "Error registering new user";
    return res.status(400).end();
  }
  // when the user is created we now create the profile
  console.log(values);
  const profileBody = {
    fullName: values.fullName,
    user: id,
  };

  const newProfile = new ProfileModel(profileBody);
  try {
    await newProfile.save();
  } catch (e) {
    console.log(e);
    res.statusMessage = "Error registering new profile";
    return res.status(400).end();
  }

  return res.status(200).json(newProfile);
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
