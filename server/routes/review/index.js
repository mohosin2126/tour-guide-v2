const express = require("express");
const router = express.Router();
const {
  createReview,
  getGuideReviews,
  getUserReviews,
  getLatestReviews,
  updateReview,
  deleteReview,
} = require("../../controllers/review/index");
const verifyToken = require("../../middleware/auth/index");

router.post("/", verifyToken, createReview);
router.get("/latest", getLatestReviews);
router.get("/guide/:guideId", getGuideReviews);
router.get("/user/:userId", verifyToken, getUserReviews);
router.put("/:id", verifyToken, updateReview);
router.delete("/:id", verifyToken, deleteReview);

module.exports = router;
