const Wishlist = require("../../models/wishlist");
const User = require("../../models/user");
const { success, badRequest, notFound, serverError } = require("../../utils/response");

const postWishlist = async (req, res) => {
  try {
    const { email, packageId } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return notFound(res, "User not found");
    }

    const existing = await Wishlist.findOne({ user: user._id, package: packageId });
    if (existing) {
      return badRequest(res, "Package already in wishlist");
    }

    const wishlist = new Wishlist({ user: user._id, package: packageId });
    await wishlist.save();

    const populated = await Wishlist.findById(wishlist._id)
      .populate("package", "title price duration coverImage");

    return success(res, "Created", populated, 201);
  } catch (err) {
    return serverError(res, err.message, err.message);
  }
};

const getWishlist = async (req, res) => {
  try {
    const email = req.query.email;
    const user = await User.findOne({ email });
    if (!user) {
      return notFound(res, "User not found");
    }

    const wishlist = await Wishlist.find({ user: user._id })
      .populate("package", "title price duration coverImage difficulty")
      .sort({ addedAt: -1 });

    return success(res, "Success", wishlist);
  } catch (err) {
    return serverError(res, err.message, err.message);
  }
};

const deleteWishlist = async (req, res) => {
  try {
    const { id } = req.params;
    const wishlist = await Wishlist.findByIdAndDelete(id);
    if (!wishlist) {
      return notFound(res, "Wishlist item not found");
    }
    return success(res, "Removed from wishlist");
  } catch (err) {
    return serverError(res, err.message, err.message);
  }
};

module.exports = {
  postWishlist,
  getWishlist,
  deleteWishlist,
};
