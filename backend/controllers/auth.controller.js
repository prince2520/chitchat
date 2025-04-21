const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { StatusCodes } = require("http-status-codes");

// POST -> Sign Up
exports.signup = async (req, res, next) => {
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
  const email = req.body.email;
  const password = req.body.password;

  try {
    const userFound = await User.findOne({ email: email }).select("+password");

    if (!userFound) {
      let error = new Error("User not found!");
      error.statusCode = StatusCodes.NOT_FOUND;
      throw error;
    }

    const isEqual = await bcrypt.compare(password, userFound.password);

    if (!isEqual) {
      let error = new Error("Password incorrect!");
      error.statusCode = StatusCodes.UNAUTHORIZED;
      throw error;
    } else {
      const loadedUser = await User.findOne({ email: email })
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

      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString(),
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "5h" }
      );

      return res.status(StatusCodes.OK).json({
        success: true,
        message: "Login successfully!",
        token: token,
        user: loadedUser,
      });
    }
  } catch (err) {
    next(err);
  }
};
