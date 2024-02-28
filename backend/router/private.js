const express = require('express');
const {
    addPrivateUser,
    fetchPrivateUser,
    sendPrivateMessage,
    fetchPrivate
} = require("../controllers/private");

const router = express.Router();

router.post('/addPrivateChat',addPrivateUser );

router.get('/fetchPrivateUser', fetchPrivateUser);

router.post('/sendPrivateMessage',sendPrivateMessage);

router.get( '/fetchPrivateMessage',fetchPrivate);

module.exports = router;
