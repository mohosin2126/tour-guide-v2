const express = require("express");
const router = express.Router();
const { postWishlist, getWishlist, deleteWishlist } = require("../../controllers/wishlist/index");
const verifyToken = require("../../middleware/auth/index");

router.post("/", verifyToken, postWishlist);
router.get("/", verifyToken, getWishlist);
router.delete("/:id", verifyToken, deleteWishlist);

module.exports = router;
