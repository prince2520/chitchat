const express = require('express');

const {createMessage} = require('../controllers/message');

const {check} = require("express-validator");


const router = express.Router();

router.post('/createMessage',check('message')
        .isLength({min:1})
        .withMessage('message should be at least 5 character long.')
    ,createMessage);

module.exports = router;
