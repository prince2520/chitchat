const express = require('express');
const {
    addPrivateUser,
    fetchPrivateUser,
    createPersonalMessage,
    fetchPrivateMessage
} = require("../controllers/private");

const router = express.Router();

router.post('/addPrivateChat',addPrivateUser );

router.get('/fetchPrivateUser', fetchPrivateUser);

router.post('/sendPrivateMessage',createPersonalMessage);

router.get( '/fetchPrivateMessage',fetchPrivateMessage);

module.exports = router;
