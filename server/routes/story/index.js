const express = require("express");
const router = express.Router();
const {
  getStories,
  getStoryById,
  getUserStories,
  createStory,
  updateStory,
  deleteStory,
  toggleLike,
} = require("../../controllers/story/index");
const verifyToken = require("../../middleware/auth/index");

router.get("/", getStories);
router.get("/user", verifyToken, getUserStories);
router.get("/:id", getStoryById);
router.post("/", verifyToken, createStory);
router.put("/:id", verifyToken, updateStory);
router.delete("/:id", verifyToken, deleteStory);
router.post("/like", verifyToken, toggleLike);

module.exports = router;
