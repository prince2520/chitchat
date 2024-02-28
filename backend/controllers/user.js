const User = require("../models/user");
const Room = require("../models/group");
const mongoose = require("mongoose");

exports.createUser = async (req, res, next) => {
  const userName = req.body.userName;
  const roomName = req.body.roomName;

  const userFound = await User.findOne({ userName: userName });
  const roomFound = await Room.findOne({ roomName: roomName });

  if (userFound) {
    roomFound?.user.push(userFound._id);
    roomFound?.save();
    return res.status(200).json({ message: "User already exist!" });
  } else {
    const newUser = new User({
      userName: userName,
    });
    const saveUser = await newUser.save();
    roomFound.user.push(saveUser._id);
    roomFound.save();

    return res
      .status(200)
      .json({ success: false, message: "User already exist!" });
  }
};

exports.fetchUser = async (req, res) => {
  const userId = mongoose.Types.ObjectId(req.query.userId);

  let userFound = await User.findOne({ _id: userId })
    .populate("groups")
    .populate("privates")
    .populate({
      path: "groups",
      populate: { path: "users", path: " messages", populate: "user" },
    });
    
  if (req.query.email) {
    userFound = await User.findOne({ email: req.query.email });
  }

  if (userFound) {
    return res.status(200).json({ success: true, user: userFound });
  } else {
    return res.status(200).json({ success: false, message: "No User Found!" });
  }
};

exports.fetchAuthUser = async (req, res, next) => {
  const authUserId = mongoose.Types.ObjectId(req.query.authUser);

  const userFound = await User.findOne({ _id: authUserId });

  if (userFound) {
    return res.status(200).json({ userFound: true, user: userFound });
  } else {
    return res.status(200).json({ userFound: false, user: "No UserFound" });
  }
};

exports.saveProfile = async (req, res, next) => {
  const status = req.body.status;
  const username = req.body.username;
  const _id = mongoose.Types.ObjectId(req.body.userId);
  const profileImageUrl = req.body.profileImageUrl;

  const userFound = await User.findOne({ _id: _id });

  if (userFound) {
    userFound.username = username;
    userFound.status = status;

    if (profileImageUrl) {
      userFound.profileImageUrl = profileImageUrl;
    }

    userFound.save().then((result) => {
      return res.status(200).json({
        success: true,
        message: "Profile Updated!",
      });
    });
  } else {
    return res.status(404).json({ success: false, message: "No User Found!" });
  }
};
