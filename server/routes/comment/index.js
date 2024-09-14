const express = require("express");
const router = express.Router();
const { postComment, getComments } = require("../../controllers/comment/index");

router.post("/", postComment);
router.get("/", getComments);

module.exports = router;
