const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { validationResult } = require("express-validator");

exports.signup = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  const invalidInput = validationResult(req);

  if (!invalidInput.isEmpty()) {
    return res
      .status(422)
      .json({ success: false, message: invalidInput?.errors[0].msg });
  } else {
    const userFound = await User.findOne({ email: email });

    if (userFound) {
      return res
        .status(422)
        .json({ success: false, message: "Email already exit!" });
    } else {
      bcrypt
        .hash(password, 12)
        .then((hashedPw) => {
          const newUser = new User({
            name: name,
            email: email,
            password: hashedPw,
          });
          return newUser.save();
        })
        .then(() => {
          return res
            .status(201)
            .json({ success: true, message: "User Created" });
        });
    }
  }
};

exports.login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const invalidInput = validationResult(req);

  if (!invalidInput.isEmpty()) {
    return res
      .status(422)
      .json({ success: false, message: invalidInput?.errors[0].msg });
  }

  let loadedUser;

  User.findOne({ email: email })
    .populate({
      path: "privates",
      populate: [{ path: "messages", populate: "user" }, "users"],
    })
    .populate({
      path: "groups",
      populate: [{ path: "messages", populate: "user" }],
    })
    .then((user) => {
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        return res
          .status(422)
          .json({ success: false, message: "Password Incorrect!" });
      } else {
        const token = jwt.sign(
          {
            email: loadedUser.email,
            userId: loadedUser._id.toString(),
          },
          "OnePiece",
          { expiresIn: "1h" }
        );
        return res.status(200).json({
          success: true,
          token: token,
          user: loadedUser,
        });
      }
    })
    .catch(() => {
      return res
        .status(422)
        .json({ success: false, message: "Email not found!" });
    });
};
