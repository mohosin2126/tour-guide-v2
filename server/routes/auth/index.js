const express = require("express");
const router = express.Router();
const { getToken } = require("../../controllers/auth/index");

router.post("/token", getToken);

module.exports = router;
