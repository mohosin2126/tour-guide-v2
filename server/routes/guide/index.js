const express = require("express");
const router = express.Router();
const {
  getGuides,
  getGuideById,
  getPendingGuides,
  approveGuide,
  postGuide,
} = require("../../controllers/guide/index");
const verifyToken = require("../../middleware/auth/index");
const verifyAdmin = require("../../middleware/admin/index");

router.get("/", getGuides);
router.get("/pending", verifyToken, verifyAdmin, getPendingGuides);
router.get("/:id", getGuideById);
router.post("/", verifyToken, verifyAdmin, postGuide);
router.patch("/:id/approve", verifyToken, verifyAdmin, approveGuide);

module.exports = router;
