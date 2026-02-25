const express = require("express");
const router = express.Router();
const {
  getPackages,
  getPackageById,
  getGuidePackages,
  createPackage,
  updatePackage,
  deletePackage,
  approvePackage,
  getPendingPackages,
} = require("../../controllers/package/index");
const verifyToken = require("../../middleware/auth/index");
const verifyAdmin = require("../../middleware/admin/index");
const verifyGuide = require("../../middleware/guide/index");

router.get("/", getPackages);
router.get("/pending", verifyToken, verifyAdmin, getPendingPackages);
router.get("/guide/:guideId", getGuidePackages);
router.get("/:id", getPackageById);
router.post("/", verifyToken, verifyGuide, createPackage);
router.put("/:id", verifyToken, verifyGuide, updatePackage);
router.delete("/:id", verifyToken, deletePackage);
router.patch("/:id/approve", verifyToken, verifyAdmin, approvePackage);

module.exports = router;
