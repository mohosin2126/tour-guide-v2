const User = require("../../models/user");
const { success, notFound, serverError } = require("../../utils/response");

const getGuides = async (req, res) => {
  try {
    const guides = await User.find({ role: "guide", isApproved: true, isActive: true })
      .select("-password");
    return success(res, "Success", guides);
  } catch (err) {
    return serverError(res, err.message, err.message);
  }
};

const getGuideById = async (req, res) => {
  try {
    const guide = await User.findOne({ _id: req.params.id, role: "guide" })
      .select("-password");
    if (!guide) {
      return notFound(res, "Guide not found");
    }
    return success(res, "Success", guide);
  } catch (err) {
    return serverError(res, err.message, err.message);
  }
};

const getPendingGuides = async (req, res) => {
  try {
    const guides = await User.find({ role: "guide", isApproved: false })
      .select("-password");
    return success(res, "Success", guides);
  } catch (err) {
    return serverError(res, err.message, err.message);
  }
};

const approveGuide = async (req, res) => {
  try {
    const guide = await User.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    ).select("-password");

    if (!guide) {
      return notFound(res, "Guide not found");
    }
    return success(res, "Guide approved", { guide });
  } catch (err) {
    return serverError(res, err.message, err.message);
  }
};

const rejectGuide = async (req, res) => {
  try {
    const guide = await User.findByIdAndUpdate(
      req.params.id,
      { role: "user", isApproved: false },
      { new: true }
    ).select("-password");

    if (!guide) {
      return notFound(res, "Guide not found");
    }
    return success(res, "Guide rejected", { guide });
  } catch (err) {
    return serverError(res, err.message, err.message);
  }
};

const postGuide = async (req, res) => {
  try {
    const guide = req.body;
    const result = await User.create(guide);
    return success(res, "Created", result, 201);
  } catch (err) {
    return serverError(res, err.message, err.message);
  }
};

module.exports = {
  getGuides,
  getGuideById,
  getPendingGuides,
  approveGuide,
  rejectGuide,
  postGuide,
};
