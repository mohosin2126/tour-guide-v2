const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUserByEmail,
  postUser,
  makeAdmin,
  checkAdmin,
  makeGuide,
  checkGuide,
} = require("../../controllers/user/index");
const verifyToken = require("../../middleware/auth/index");
const verifyAdmin = require("../../middleware/admin/index");
const verifyGuide = require("../../middleware/guide/index");

router.get("/", verifyToken, verifyAdmin, getUsers);
router.get("/email", verifyToken, getUserByEmail);
router.post("/", postUser);
router.patch("/admin/:id", verifyToken, verifyAdmin, makeAdmin);
router.get("/admin/:email", verifyToken, checkAdmin);
router.patch("/guide/:id", verifyToken, verifyAdmin, makeGuide);
router.get("/guide/:email", verifyToken, checkGuide);

module.exports = router;
