const express = require("express");
const router = express.Router();
const { getStories } = require("../../controllers/story/index");

router.get("/", getStories);

module.exports = router;
