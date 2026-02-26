const Booking = require("../../models/booking");
const Package = require("../../models/package");
const {
  success,
  notFound,
  serverError,
} = require("../../utils/response");

const insertBooking = async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();

    await Package.findByIdAndUpdate(booking.package, {
      $inc: { totalBookings: 1 },
    });

    const populatedBooking = await Booking.findById(booking._id)
      .populate("user", "name email photo")
      .populate("package", "title price duration")
      .populate("guide", "name email photo");

    return success(res, "Created", populatedBooking, 201);
  } catch (err) {
    return serverError(res, err.message, err.message);
  }
};

const getBookings = async (req, res) => {
  try {
    const email = req.query.email;
    const user = await require("../../models/user").findOne({ email });
    if (!user) {
      return notFound(res, "User not found");
    }

    const bookings = await Booking.find({ user: user._id })
      .populate("package", "title price duration coverImage")
      .populate("guide", "name email photo")
      .sort({ createdAt: -1 });

    return success(res, "Success", bookings);
  } catch (err) {
    return serverError(res, err.message, err.message);
  }
};

const getGuideBookings = async (req, res) => {
  try {
    const email = req.query.email;
    const guide = await require("../../models/user").findOne({ email, role: "guide" });

    if (!guide) {
      return notFound(res, "Guide not found");
    }

    const bookings = await Booking.find({ guide: guide._id })
      .populate("user", "name email photo phone")
      .populate("package", "title price duration")
      .sort({ createdAt: -1 });

    return success(res, "Success", bookings);
  } catch (err) {
    return serverError(res, err.message, err.message);
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")
      .populate("package", "title price")
      .populate("guide", "name email")
      .sort({ createdAt: -1 });

    return success(res, "Success", bookings);
  } catch (err) {
    return serverError(res, err.message, err.message);
  }
};

const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.params;

    const booking = await Booking.findByIdAndUpdate(
      id,
      { status, ...(status === "cancelled" && { cancelledAt: Date.now() }) },
      { new: true }
    ).populate("user", "name email").populate("package", "title");

    if (!booking) {
      return notFound(res, "Booking not found");
    }

    return success(res, `Booking ${status}`, { booking });
  } catch (err) {
    return serverError(res, err.message, err.message);
  }
};

const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      id,
      {
        status: "cancelled",
        cancelledAt: Date.now(),
        cancellationReason: reason,
      },
      { new: true }
    );

    if (!booking) {
      return notFound(res, "Booking not found");
    }

    return success(res, "Booking cancelled", { booking });
  } catch (err) {
    return serverError(res, err.message, err.message);
  }
};

const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findByIdAndDelete(id);

    if (!booking) {
      return notFound(res, "Booking not found");
    }

    return success(res, "Booking deleted");
  } catch (err) {
    return serverError(res, err.message, err.message);
  }
};

module.exports = {
  insertBooking,
  getBookings,
  getGuideBookings,
  getAllBookings,
  updateBookingStatus,
  cancelBooking,
  deleteBooking,
};
