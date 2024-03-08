const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const {signup, login} = require("../controllers/auth");

router.post(
  "/signup",
  [
    check("name")
      .isLength({ min: 5 })
      .withMessage("User name should be at least 5 character long.")
      .isAlphanumeric()
      .trim(),
    check("email").isEmail().withMessage("Enter valid email.").trim(),
    check("password")
      .isLength({ min: 5 })
      .withMessage("Password Should be at least 10 character.")
      .trim(),
  ],
  signup
);

router.post(
  "/login",
  [
    check("email").isEmail().withMessage("Enter valid email.").trim(),
    check("password")
      .isLength({ min: 5 })
      .withMessage("Password Should be at least 10 character.")
      .trim(),
  ],
  login
);

module.exports = router;
