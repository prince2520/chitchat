const express = require('express');

const {createRoom,joinGroup,fetchRoomMessages , fetchRoomNames}  = require('../controllers/group');

const isAuth = require('../middleware/is-auth')
const {check} = require("express-validator");


const router = express.Router();

router.post('/createRoom',[
    check('groupName')
        .isLength({min:1})
        .withMessage('User name should be at least 5 character long.')
        .trim(),
],createRoom);

router.post('/joinGroup', joinGroup)

router.get('/fetchRoomMessages',isAuth,fetchRoomMessages)

router.get('/fetchRoomNames',fetchRoomNames);

module.exports = router;
