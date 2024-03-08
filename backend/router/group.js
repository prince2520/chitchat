const express = require('express');

const {createGroup, joinGroup, saveGroupMessage, blockUser, unBlockUser}  = require('../controllers/group');

const isAuth = require('../middleware/is-auth')
const {check} = require("express-validator");

const router = express.Router();

router.post('/create-group', [
    check('name')
        .isLength({min:1})
        .withMessage('User name should be at least 5 character long.')
        .trim(),
], isAuth, createGroup);

router.put('/join-group', isAuth, joinGroup);

router.put('/save-group-message', isAuth, saveGroupMessage);

router.put("/block-user", isAuth, blockUser);

router.put("/unblock-user", isAuth, unBlockUser);

module.exports = router;
