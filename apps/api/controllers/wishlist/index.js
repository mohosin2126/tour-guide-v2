const Wishlist = require("../../models/wishlist");
const User = require("../../models/user");

const postWishlist = async (req, res) => {
  try {
    const { email, packageId } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    const existing = await Wishlist.findOne({ user: user._id, package: packageId });
    if (existing) {
      return res.status(400).json({ error: "Package already in wishlist" });
    }
    
    const wishlist = new Wishlist({ user: user._id, package: packageId });
    await wishlist.save();
    
    const populated = await Wishlist.findById(wishlist._id)
      .populate("package", "title price duration coverImage");
    
    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getWishlist = async (req, res) => {
  try {
    const email = req.query.email;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    const wishlist = await Wishlist.find({ user: user._id })
      .populate("package", "title price duration coverImage difficulty")
      .sort({ addedAt: -1 });
    
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteWishlist = async (req, res) => {
  try {
    const { id } = req.params;
    const wishlist = await Wishlist.findByIdAndDelete(id);
    if (!wishlist) {
      return res.status(404).json({ error: "Wishlist item not found" });
    }
    res.json({ message: "Removed from wishlist" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  postWishlist,
  getWishlist,
  deleteWishlist,
};
