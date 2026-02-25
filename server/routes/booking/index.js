const express = require("express");
const router = express.Router();
const {
  insertBooking,
  getBookings,
  getGuideBookings,
  getAllBookings,
  updateBookingStatus,
  cancelBooking,
  deleteBooking,
} = require("../../controllers/booking/index");
const verifyToken = require("../../middleware/auth/index");
const verifyAdmin = require("../../middleware/admin/index");
const verifyGuide = require("../../middleware/guide/index");

router.post("/", verifyToken, insertBooking);
router.get("/", verifyToken, getBookings);
router.get("/guide", verifyToken, verifyGuide, getGuideBookings);
router.get("/all", verifyToken, verifyAdmin, getAllBookings);
router.patch("/:id/status/:status", verifyToken, verifyAdmin, updateBookingStatus);
router.patch("/:id/cancel", verifyToken, cancelBooking);
router.delete("/:id", verifyToken, verifyAdmin, deleteBooking);

module.exports = router;
