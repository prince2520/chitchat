const express = require('express');


const {createUser, fetchUser, fetchAuthUser, saveProfile} = require("../controllers/user");


const router = express.Router();

router.post('/createUser',createUser);

router.get('/fetchUser',fetchUser)

router.get('/fetchAuthUser',fetchAuthUser);

router.post('/saveProfile',saveProfile);

module.exports = router;
