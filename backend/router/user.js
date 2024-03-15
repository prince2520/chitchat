const express = require('express');

const { fetchUser, updateUser} = require("../controllers/user");
const isAuth = require('../middleware/isAuth');

const router = express.Router();

router.get('/fetch-user',fetchUser)
router.put('/update-user', isAuth, updateUser);

module.exports = router;
