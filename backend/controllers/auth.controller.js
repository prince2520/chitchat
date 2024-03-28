const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { StatusCodes } = require("http-status-codes");

// POST -> Sign Up
exports.signup = async (req, res, next) => {
  
  //User data
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  try {
    if (password !== confirmPassword) {
      let error = new Error("Confirm password and password are not matched!");
      error.statusCode = StatusCodes.BAD_REQUEST;
      throw error;
    }

    const userFound = await User.findOne({ email: email });

    if (userFound) {
      let error = new Error("User with this email already exists");
      error.statusCode = StatusCodes.BAD_REQUEST;
      throw error;
    }

    const hashedPw = await bcrypt.hash(password, 12);

    if (!hashedPw) {
      let error = new Error(err.message);
      error.statusCode = StatusCodes.BAD_REQUEST;
      throw error;
    }

    const newUser = new User({
      name: name,
      email: email,
      password: hashedPw,
    });

    await newUser.save();

    return res
      .status(StatusCodes.OK)
      .json({ success: true, message: "User Created" });

  } catch (err) {
    next(err);
  }
};

// POST - Login
exports.login = async (req, res, next) => {
  // data
  const email = req.body.email;
  const password = req.body.password;

  try {
    let loadedUser;

    const userFound = await User.findOne({ email: email })
      .populate({
        path: "privates",
        populate: [{ path: "messages", populate: "user" }, "users"],
      })
      .populate({
        path: "groups",
        populate: [
          { path: "blockList", populate: "user" },
          { path: "messages", populate: "user" }]
      });

    if (!userFound) {
      let error = new Error("User not found!");
      error.statusCode = StatusCodes.NOT_FOUND;
      throw error;
    }

    loadedUser = userFound;

    const isEqual = bcrypt.compare(password, userFound.password);

    if (!isEqual) {
      let error = new Error("Password incorrect!");
      error.statusCode = StatusCodes.UNAUTHORIZED;
      throw error;
    } else {
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString(),
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1h" }
      );

      return res.status(StatusCodes.OK).json({
        success: true,
        token: token,
        user: loadedUser,
      });
    }
  } catch (err) {
    next(err);
  }
};
