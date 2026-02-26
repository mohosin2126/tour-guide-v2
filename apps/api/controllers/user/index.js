const User = require("../../models/user");
const {
  success,
  badRequest,
  unauthorized,
  forbidden,
  notFound,
  conflict,
  serverError,
} = require("../../utils/response");

const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    return success(res, "Success", users);
  } catch (err) {
    return serverError(res, err.message, err.message);
  }
};

const getUserByEmail = async (req, res) => {
  try {
    const email = req.query.email;
    const user = await User.findOne({ email }).select("-password");
    if (!user) {
      return notFound(res, "User not found");
    }
    return success(res, "Success", user);
  } catch (err) {
    return serverError(res, err.message, err.message);
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return notFound(res, "User not found");
    }
    return success(res, "Success", user);
  } catch (err) {
    return serverError(res, err.message, err.message);
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, email, phone, bio, photo, location, specialties } = req.body;
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (email !== undefined) updateData.email = email;
    if (phone !== undefined) updateData.phone = phone;
    if (bio !== undefined) updateData.bio = bio;
    if (photo !== undefined) updateData.photo = photo;
    if (location !== undefined) updateData.location = location;
    if (specialties !== undefined) updateData.specialties = specialties;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return notFound(res, "User not found");
    }
    return success(res, "Success", user);
  } catch (err) {
    return serverError(res, err.message, err.message);
  }
};

const postUser = async (req, res) => {
  try {
    const user = req.body;
    const existingUser = await User.findOne({ email: user.email });
    if (existingUser) {
      return conflict(res, "user already exists");
    }
    const newUser = new User(user);
    await newUser.save();
    return success(res, "Created", newUser, 201);
  } catch (err) {
    return serverError(res, err.message, err.message);
  }
};

const makeAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndUpdate(
      id,
      { role: "admin" },
      { new: true }
    ).select("-password");

    if (!user) {
      return notFound(res, "User not found");
    }
    return success(res, "User is now an admin", { user });
  } catch (err) {
    return serverError(res, err.message, err.message);
  }
};

const checkAdmin = async (req, res) => {
  try {
    const email = req.params.email;
    if (email !== req.decoded.email) {
      return forbidden(res, "unauthorized access");
    }
    const user = await User.findOne({ email });
    return success(res, "Success", { admin: user?.role === "admin" });
  } catch (err) {
    return serverError(res, err.message, err.message);
  }
};

const makeGuide = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndUpdate(
      id,
      { role: "guide", isApproved: true },
      { new: true }
    ).select("-password");

    if (!user) {
      return notFound(res, "User not found");
    }
    return success(res, "User is now a guide", { user });
  } catch (err) {
    return serverError(res, err.message, err.message);
  }
};

const checkGuide = async (req, res) => {
  try {
    const email = req.params.email;
    if (email !== req.decoded.email) {
      return forbidden(res, "unauthorized access");
    }
    const user = await User.findOne({ email });
    return success(res, "Success", { guide: user?.role === "guide" });
  } catch (err) {
    return serverError(res, err.message, err.message);
  }
};

const updateRole = async (req, res) => {
  try {
    const { role } = req.body;
    const validRoles = ["user", "guide", "admin"];
    if (!validRoles.includes(role)) {
      return badRequest(res, "Invalid role. Must be user, guide, or admin");
    }
    const updateData = { role };
    if (role === "guide" || role === "admin") {
      updateData.isApproved = true;
    }
    if (role === "user") {
      updateData.isApproved = false;
    }
    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).select("-password");
    if (!user) {
      return notFound(res, "User not found");
    }
    return success(res, `Role updated to ${role}`, { user });
  } catch (err) {
    return serverError(res, err.message, err.message);
  }
};

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return badRequest(res, "Current and new password are required");
    }
    if (newPassword.length < 6) {
      return badRequest(res, "New password must be at least 6 characters");
    }
    const user = await User.findById(req.decoded.id);
    if (!user) {
      return notFound(res, "User not found");
    }
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return unauthorized(res, "Current password is incorrect");
    }
    user.password = newPassword;
    await user.save();
    return success(res, "Password updated successfully");
  } catch (err) {
    return serverError(res, err.message, err.message);
  }
};

const updateNotificationPreferences = async (req, res) => {
  try {
    const { emailBooking, emailNewsletter, emailReview } = req.body;
    const user = await User.findByIdAndUpdate(
      req.decoded.id,
      {
        notificationPreferences: {
          emailBooking: emailBooking !== undefined ? emailBooking : true,
          emailNewsletter: emailNewsletter !== undefined ? emailNewsletter : false,
          emailReview: emailReview !== undefined ? emailReview : true,
        },
      },
      { new: true }
    ).select("-password");
    if (!user) {
      return notFound(res, "User not found");
    }
    return success(res, "Notification preferences updated", { user });
  } catch (err) {
    return serverError(res, err.message, err.message);
  }
};

const toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return notFound(res, "User not found");
    }
    user.isActive = !user.isActive;
    await user.save();
    return success(res, `User ${user.isActive ? "activated" : "deactivated"}`, { user });
  } catch (err) {
    return serverError(res, err.message, err.message);
  }
};

module.exports = {
  getUsers,
  getUserByEmail,
  getUserById,
  updateUser,
  postUser,
  makeAdmin,
  checkAdmin,
  makeGuide,
  checkGuide,
  toggleUserStatus,
  updateRole,
  changePassword,
  updateNotificationPreferences,
};
