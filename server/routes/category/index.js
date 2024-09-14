const express = require("express");
const router = express.Router();
const { getCategories } = require("../../controllers/category/index");

router.get("/", getCategories);

module.exports = router;
