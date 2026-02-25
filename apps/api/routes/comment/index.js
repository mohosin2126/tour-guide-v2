const express = require("express");
const router = express.Router();
const {
  postComment,
  getComments,
  deleteComment,
} = require("../../controllers/comment/index");
const verifyToken = require("../../middleware/auth/index");

router.post("/", verifyToken, postComment);
router.get("/", getComments);
router.delete("/:id", verifyToken, deleteComment);

module.exports = router;
