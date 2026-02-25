const Booking = require("../../models/booking");
const Package = require("../../models/package");

const insertBooking = async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    
    await Package.findByIdAndUpdate(booking.package, {
      $inc: { totalBookings: 1 }
    });
    
    const populatedBooking = await Booking.findById(booking._id)
      .populate("user", "name email photo")
      .populate("package", "title price duration")
      .populate("guide", "name email photo");
    
    res.status(201).json(populatedBooking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBookings = async (req, res) => {
  try {
    const email = req.query.email;
    const user = await require("../../models/user").findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    const bookings = await Booking.find({ user: user._id })
      .populate("package", "title price duration coverImage")
      .populate("guide", "name email photo")
      .sort({ createdAt: -1 });
    
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getGuideBookings = async (req, res) => {
  try {
    const email = req.query.email;
    const guide = await require("../../models/user").findOne({ email, role: "guide" });
    
    if (!guide) {
      return res.status(404).json({ error: "Guide not found" });
    }
    
    const bookings = await Booking.find({ guide: guide._id })
      .populate("user", "name email photo phone")
      .populate("package", "title price duration")
      .sort({ createdAt: -1 });
    
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")
      .populate("package", "title price")
      .populate("guide", "name email")
      .sort({ createdAt: -1 });
    
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
      return res.status(404).json({ error: "Booking not found" });
    }
    
    res.json({ message: `Booking ${status}`, booking });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
        cancellationReason: reason
      },
      { new: true }
    );
    
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    
    res.json({ message: "Booking cancelled", booking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findByIdAndDelete(id);
    
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    
    res.json({ message: "Booking deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
