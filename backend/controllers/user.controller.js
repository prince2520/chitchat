const User = require("../models/user.model");
const mongoose = require("mongoose");
const { StatusCodes } = require("http-status-codes");

// GET -> Fetch User
exports.fetchUser = async (req, res, next) => {
  const email = req.query.email;

  try {
    const userFound = await User.findOne({ email: email })
      .populate({
        path: "privates",
        populate: [{ path: "messages", populate: "user" }, "users"],
      })
      .populate({
        path: "groups",
        populate: [{ path: "messages", populate: "user" }, 
        { path: "blockList", populate: "user" }
        , "users"],
      })
      .lean();

    if (!userFound) {
      let error = new Error("User not found!");
      error.statusCode = StatusCodes.NOT_FOUND;
      throw error;
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "User found successfully!",
      user: userFound,
    });
  } catch (err) {
    next(err);
  }
};

// PUT -> Update User
exports.updateUser = async (req, res) => {
  const _id = mongoose.Types.ObjectId(req.userId);
  const name = req.body.name;
  const status = req.body.status;
  const lowResUrl = req.body.lowResUrl;
  const highResUrl = req.body.highResUrl;

  try {
    const userFound = await User.findOne({ _id: _id });

    if (!userFound) {
      let error = new Error("User not found!");
      error.statusCode = StatusCodes.NOT_FOUND;
      throw error;
    }

    userFound.name = name;
    userFound.status = status;

    if (highResUrl && lowResUrl) {
      userFound.highResUrl = highResUrl;
      userFound.lowResUrl = lowResUrl;
    }

    const saveUser = await userFound.save();

    if (!saveUser) {
      let error = new Error("Profile not updated");
      error.statusCode = StatusCodes.NOT_MODIFIED;
      throw error;
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Profile Updated!",
      user: saveUser
    });
  } catch (err) {
    next(err);
  }
};
