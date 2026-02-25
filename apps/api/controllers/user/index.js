const User = require("../../models/user");

const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserByEmail = async (req, res) => {
  try {
    const email = req.query.email;
    const user = await User.findOne({ email }).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const postUser = async (req, res) => {
  try {
    const user = req.body;
    const existingUser = await User.findOne({ email: user.email });
    if (existingUser) {
      return res.send({ message: "user already exists", insertedId: null });
    }
    const newUser = new User(user);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User is now an admin", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const checkAdmin = async (req, res) => {
  try {
    const email = req.params.email;
    if (email !== req.decoded.email) {
      return res.stats(403).send({ message: "unauthorized access" });
    }
    const user = await User.findOne({ email });
    res.send({ admin: user?.role === "admin" });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User is now a guide", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const checkGuide = async (req, res) => {
  try {
    const email = req.params.email;
    if (email !== req.decoded.email) {
      return res.status(403).send({ message: "unauthorized access" });
    }
    const user = await User.findOne({ email });
    res.send({ guide: user?.role === "guide" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateRole = async (req, res) => {
  try {
    const { role } = req.body;
    const validRoles = ["user", "guide", "admin"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ error: "Invalid role. Must be user, guide, or admin" });
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
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: `Role updated to ${role}`, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: "Current and new password are required" });
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ error: "New password must be at least 6 characters" });
    }
    const user = await User.findById(req.decoded.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ error: "Current password is incorrect" });
    }
    user.password = newPassword;
    await user.save();
    res.json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "Notification preferences updated", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.isActive = !user.isActive;
    await user.save();
    res.json({ message: `User ${user.isActive ? 'activated' : 'deactivated'}`, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
