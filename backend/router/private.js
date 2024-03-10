const express = require('express');
const {
    createPrivate,
    savePrivateMessage,
    deletePrivate
} = require("../controllers/private");
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.post('/create-private', isAuth, createPrivate);

router.delete('/delete-private', isAuth, deletePrivate);

router.put('/save-private-message', isAuth, savePrivateMessage);

module.exports = router;
