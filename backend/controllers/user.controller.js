const User = require("../models/user.model");
const mongoose = require("mongoose");
const log = require("npmlog");
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
        populate: [{ path: "messages", populate: "user" }, "users"],
      })
      .lean();

    console.log('userFound', userFound);  

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
  const name = req.body.name;
  const status = req.body.status;
  const highResUrl = req.body.highResUrl;
  const lowResUrl = req.body.lowResUrl;
  const _id = mongoose.Types.ObjectId(req.userId);

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

    userFound
      .save()
      .then(() => {
        return res.status(StatusCodes.OK).json({
          success: true,
          message: "Profile Updated!",
        });
      })
      .catch(() => {
        let error = new Error("Profile not updated");
        error.statusCode = StatusCodes.NOT_MODIFIED;
        throw error;
      });
  } catch (err) {
    next(err);
  }
};
