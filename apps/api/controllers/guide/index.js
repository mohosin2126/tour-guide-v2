const User = require("../../models/user");

const getGuides = async (req, res) => {
  try {
    const guides = await User.find({ role: "guide", isApproved: true, isActive: true })
      .select("-password");
    res.json(guides);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getGuideById = async (req, res) => {
  try {
    const guide = await User.findOne({ _id: req.params.id, role: "guide" })
      .select("-password");
    if (!guide) {
      return res.status(404).json({ error: "Guide not found" });
    }
    res.json(guide);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPendingGuides = async (req, res) => {
  try {
    const guides = await User.find({ role: "guide", isApproved: false })
      .select("-password");
    res.json(guides);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
      return res.status(404).json({ error: "Guide not found" });
    }
    res.json({ message: "Guide approved", guide });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
      return res.status(404).json({ error: "Guide not found" });
    }
    res.json({ message: "Guide rejected", guide });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const postGuide = async (req, res) => {
  try {
    const guide = req.body;
    const result = await User.create(guide);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
