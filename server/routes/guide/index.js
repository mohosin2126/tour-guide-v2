const express = require("express");
const router = express.Router();
const { getGuides, postGuide } = require("../../controllers/guide/index");
const verifyToken = require("../../middleware/auth/index");
const verifyAdmin = require("../../middleware/admin/index");

router.get("/", getGuides);
router.post("/", verifyToken, verifyAdmin, postGuide);

module.exports = router;
