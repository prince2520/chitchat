const express = require('express');

const { fetchUser, updateUser} = require("../controllers/user.controller");
const isAuth = require('../middleware/isAuth.middleware');

const router = express.Router();

router.get('/fetch-user', isAuth, fetchUser)
router.put('/update-user', isAuth, updateUser);

module.exports = router;
