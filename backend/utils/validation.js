const Joi = require("joi");
const {
  customAuthNameMsgs,
  customEmailMsgs,
  customPasswordMsgs,
} = require("constants");

// Validation - Signup
exports.signupSchema = Joi.object({
  name: Joi.string()
    .ruleset.trim()
    .alphanum()
    .rule({ message: "Name should be only alphanumeric characters." })
    .min(5)
    .rule({ message: "Name should be only 5 characters long." })
    .max(20)
    .rule({ message: "Name should be only 20 characters long." })
    .required(),
  email: Joi.string()
    .ruleset.email()
    .rule({ message: "Email is not valid." })
    .required(),
  password: Joi.string()
    .alphanum()
    .rule({ message: "Password should be only alphanumeric characters." })
    .min(8)
    .rule({ message: "Password should be atleast 8 characters long." })
    .max(20)
    .rule({ message: "Password should be atmost 20 characters long." })
    .required(),
  confirmPassword: Joi.ref("password"),
});

// Validation - Login
exports.loginSchema = Joi.object({
  email: Joi.string()
    .ruleset.email()
    .rule({ message: "Email is not valid." })
    .required(),
  password: Joi.string()
    .alphanum()
    .rule({ message: "Password should be only alphanumeric characters." })
    .min(8)
    .rule({ message: "Password should be atleast 8 characters long." })
    .max(20)
    .rule({ message: "Password should be atmost 20 characters long." })
    .required(),
});
