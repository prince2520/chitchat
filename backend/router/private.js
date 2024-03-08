const express = require('express');
const {
    createPrivate,
    savePrivateMessage
} = require("../controllers/private");
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.post('/create-private', isAuth, createPrivate);

router.put('/save-private-message', isAuth, savePrivateMessage);

module.exports = router;
