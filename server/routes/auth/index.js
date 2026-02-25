const express = require("express");
const router = express.Router();
const { register, login, getToken } = require("../../controllers/auth/index");
const verifyToken = require("../../middleware/auth/index");

router.post("/register", register);
router.post("/login", login);
router.post("/token", verifyToken, getToken);

module.exports = router;
