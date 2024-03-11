const User = require("../models/user");
const Group = require("../models/group");
const mongoose = require("mongoose");

exports.fetchUser = async (req, res) => {
  const email = req.query.email;

  const userFound = await User.findOne({ email: email })
    .populate({
      path: "privates",
      populate: [{ path: "messages", populate: "user" }, "users"],
    })
    .populate({
      path: "groups",
      populate: [{ path: "messages", populate: "user" }, "users"],
    });

  if (userFound) {
    return res.status(200).json({ success: true, user: userFound });
  } else {
    return res.status(200).json({ success: false, message: "No User Found!" });
  }
};

exports.updateUser = async (req, res) => {
  const name = req.body.name;
  const status = req.body.status;
  const highResUrl = req.body.highResUrl;
  const lowResUrl = req.body.lowResUrl;
  const _id = mongoose.Types.ObjectId(req.userId);

  const userFound = await User.findOne({ _id: _id });

  if (userFound) {
    userFound.name = name;
    userFound.status = status;

    if (highResUrl && lowResUrl) {
      userFound.highResUrl = highResUrl;
      userFound.lowResUrl = lowResUrl;
    }

    userFound.save().then(() => {
      return res.status(200).json({
        success: true,
        message: "Profile Updated!",
      });
    });
  } else {
    return res.status(404).json({ success: false, message: "No User Found!" });
  }
};
