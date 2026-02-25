const Review = require("../../models/review");
const Booking = require("../../models/booking");
const User = require("../../models/user");

const createReview = async (req, res) => {
  try {
    const { guide, user, booking, rating, comment } = req.body;
    
    const bookingDoc = await Booking.findOne({
      _id: booking,
      user: user,
      status: "completed"
    }).populate("package");
    
    if (!bookingDoc) {
      return res.status(400).json({ 
        error: "You can only review after completing a booking" 
      });
    }
    
    if (bookingDoc.package.guide.toString() !== guide) {
      return res.status(400).json({ 
        error: "Guide mismatch" 
      });
    }
    
    const existingReview = await Review.findOne({ user, booking });
    if (existingReview) {
      return res.status(400).json({ 
        error: "You have already reviewed this guide" 
      });
    }
    
    const review = new Review({ guide, user, booking, rating, comment });
    await review.save();
    
    const guideReviews = await Review.find({ guide });
    const avgRating = guideReviews.reduce((sum, r) => sum + r.rating, 0) / guideReviews.length;
    await User.findByIdAndUpdate(guide, { rating: avgRating.toFixed(1) });
    
    const populated = await Review.findById(review._id)
      .populate("user", "name photo")
      .populate("guide", "name");
    
    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getGuideReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ 
      guide: req.params.guideId,
      isApproved: true 
    })
      .populate("user", "name photo")
      .sort({ createdAt: -1 });
    
    const avgRating = reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;
    
    res.json({
      reviews,
      avgRating: avgRating.toFixed(1),
      totalReviews: reviews.length,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getLatestReviews = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 6;
    const reviews = await Review.find({ isApproved: true })
      .populate("user", "name photo")
      .populate("guide", "name photo")
      .sort({ createdAt: -1 })
      .limit(limit);
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ user: req.params.userId })
      .populate("guide", "name photo")
      .sort({ createdAt: -1 });
    
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { rating: req.body.rating, comment: req.body.comment },
      { new: true, runValidators: true }
    ).populate("user", "name photo");
    
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }
    
    res.json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.json({ message: "Review deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createReview,
  getGuideReviews,
  getUserReviews,
  getLatestReviews,
  updateReview,
  deleteReview,
};
