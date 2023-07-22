const express = require('express');
const router = express.Router();
const { check } = require('express-validator')

const authController = require('../controllers/auth')

router.put('/signup',
    [
        check('userName')
            .isLength({min:5})
            .withMessage('User name should be at least 5 character long.')
            .isAlphanumeric()
            .trim(),
        check('email')
            .isEmail()
            .withMessage('Enter valid email.')
            .trim()
        ,
        check('password')
            .isLength({min:5})
            .withMessage('Password Should be at least 10 character.')
            .trim()
    ],authController.signUp);

router.post('/login',
    [
        check('email')
            .isEmail()
            .withMessage('Enter valid email.')
            .trim()
            ,
        check('password')
            .isLength({min:5})
            .withMessage('Password Should be at least 10 character.')
            .trim()
    ],authController.login);

module.exports = router;
