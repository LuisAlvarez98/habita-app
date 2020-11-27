const mongoose = require("mongoose");

const profileSchema = mongoose.Schema({
  fullName: {
    type: "String",
  },
  user: {
    type: "ObjectId",
    ref: "User",
    required: true,
    unique: 1,
  },
});

const Profile = mongoose.model("Profile", profileSchema);
module.exports = Profile;
