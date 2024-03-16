const express = require("express");
const router = express.Router();

const {signup, login} = require("../controllers/auth.controller");
const {signupSchema, loginSchema}  = require("../utils/validation");
const { validationHandler } = require("../middleware/validation.middleware");

router.post(
  "/signup",
  validationHandler(signupSchema),
  signup
);

router.post(
  "/login",
  validationHandler(loginSchema),
  login
);

module.exports = router;
