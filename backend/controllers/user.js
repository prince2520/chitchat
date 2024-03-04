const User = require("../models/user");
const Group = require("../models/group");
const mongoose = require("mongoose");

exports.createUser = async (req, res, next) => {
  const userId = req.body.userId;
  const groupId = req.body.groupId;

  const userFound = await User.findOne({ _id: userId });
  const groupFound = await Group.findOne({ _id: groupId });

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
  const email = req.query.email;

  let userFound = await User.findOne({ email: email })
    .populate({
       path: "privates",
       populate: [{path:'messages', populate:  'user'}, "users"]
     })
    .populate({
      path: "groups",
      populate: [{ path: "messages", populate:  'user' }, "users"]
    });

  console.log(userFound)

  if (userFound) {
    return res.status(200).json({ success: true, user: userFound });
  } else {
    return res.status(200).json({ success: false, message: "No User Found!" });
  }
};

exports.fetchAuthUser = async (req, res, next) => {
  const userFound = await User.findOne({ _id: authUserId });
  const authUserId = mongoose.Types.ObjectId(req.query.authUser);

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
