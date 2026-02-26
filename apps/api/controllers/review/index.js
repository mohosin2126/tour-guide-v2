const Review = require("../../models/review");
const Booking = require("../../models/booking");
const User = require("../../models/user");
const { success, badRequest, notFound, serverError } = require("../../utils/response");

const createReview = async (req, res) => {
  try {
    const { guide, user, booking, rating, comment } = req.body;

    const bookingDoc = await Booking.findOne({
      _id: booking,
      user: user,
      status: "completed",
    }).populate("package");

    if (!bookingDoc) {
      return badRequest(res, "You can only review after completing a booking");
    }

    if (bookingDoc.package.guide.toString() !== guide) {
      return badRequest(res, "Guide mismatch");
    }

    const existingReview = await Review.findOne({ user, booking });
    if (existingReview) {
      return badRequest(res, "You have already reviewed this guide");
    }

    const review = new Review({ guide, user, booking, rating, comment });
    await review.save();

    const guideReviews = await Review.find({ guide });
    const avgRating = guideReviews.reduce((sum, r) => sum + r.rating, 0) / guideReviews.length;
    await User.findByIdAndUpdate(guide, { rating: avgRating.toFixed(1) });

    const populated = await Review.findById(review._id)
      .populate("user", "name photo")
      .populate("guide", "name");

    return success(res, "Created", populated, 201);
  } catch (err) {
    return serverError(res, err.message, err.message);
  }
};

const getGuideReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      guide: req.params.guideId,
      isApproved: true,
    })
      .populate("user", "name photo")
      .sort({ createdAt: -1 });

    const avgRating = reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

    return success(res, "Success", {
      reviews,
      avgRating: avgRating.toFixed(1),
      totalReviews: reviews.length,
    });
  } catch (err) {
    return serverError(res, err.message, err.message);
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
    return success(res, "Success", reviews);
  } catch (err) {
    return serverError(res, err.message, err.message);
  }
};

const getUserReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ user: req.params.userId })
      .populate("guide", "name photo")
      .sort({ createdAt: -1 });

    return success(res, "Success", reviews);
  } catch (err) {
    return serverError(res, err.message, err.message);
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
      return notFound(res, "Review not found");
    }

    return success(res, "Success", review);
  } catch (err) {
    return serverError(res, err.message, err.message);
  }
};

const deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      return notFound(res, "Review not found");
    }
    return success(res, "Review deleted");
  } catch (err) {
    return serverError(res, err.message, err.message);
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
