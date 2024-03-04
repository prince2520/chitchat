const express = require('express');

const {createGroup, joinGroup, sendGroupMessage}  = require('../controllers/group');

// const isAuth = require('../middleware/is-auth')
const {check} = require("express-validator");


const router = express.Router();

router.post('/createGroup',[
    check('name')
        .isLength({min:1})
        .withMessage('User name should be at least 5 character long.')
        .trim(),
],createGroup);

router.post('/joinGroup', joinGroup)

router.post('/sendGroupMessage', sendGroupMessage)



module.exports = router;
