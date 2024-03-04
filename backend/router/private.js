const express = require('express');
const {
    createPrivate,
    sendPrivateMessage,
    fetchPrivate
} = require("../controllers/private");

const router = express.Router();

router.post('/create-private', createPrivate );

router.post('/send-private-message',sendPrivateMessage);

module.exports = router;
