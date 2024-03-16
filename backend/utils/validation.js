const Joi = require('joi');

exports.signupSchema = Joi.object({
    name: Joi.string().trim().alphanum().min(5).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().min(8).max(20).required(),
    confirmPassword: Joi.ref("password"),
})

exports.loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().min(8).max(20).required()
})
