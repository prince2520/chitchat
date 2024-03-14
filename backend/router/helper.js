const express = require("express");

const {
  urlWebsiteData,
} = require("../controllers/helper.js");

const router = express.Router();

router.post(
  "/url-website-data",
  urlWebsiteData
);

module.exports = router;
