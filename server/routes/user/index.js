const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUserByEmail,
  getUserById,
  updateUser,
  postUser,
  makeAdmin,
  checkAdmin,
  makeGuide,
  checkGuide,
  toggleUserStatus,
} = require("../../controllers/user/index");
const verifyToken = require("../../middleware/auth/index");
const verifyAdmin = require("../../middleware/admin/index");

router.get("/", verifyToken, verifyAdmin, getUsers);
router.get("/email", verifyToken, getUserByEmail);
router.get("/:id", verifyToken, getUserById);
router.put("/:id", verifyToken, updateUser);
router.post("/", postUser);
router.patch("/admin/:id", verifyToken, verifyAdmin, makeAdmin);
router.get("/admin/:email", verifyToken, checkAdmin);
router.patch("/guide/:id", verifyToken, verifyAdmin, makeGuide);
router.get("/guide/:email", verifyToken, checkGuide);
router.patch("/:id/toggle-status", verifyToken, verifyAdmin, toggleUserStatus);

module.exports = router;
