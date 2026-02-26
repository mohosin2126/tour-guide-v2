const Story = require("../../models/story");
const User = require("../../models/user");
const { success, notFound, serverError } = require("../../utils/response");

const getStories = async (req, res) => {
  try {
    const stories = await Story.find({ isPublished: true, isApproved: true })
      .populate("user", "name photo")
      .sort({ createdAt: -1 });
    return success(res, "Success", stories);
  } catch (err) {
    return serverError(res, err.message, err.message);
  }
};

const getStoryById = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id)
      .populate("user", "name photo bio");

    if (!story) {
      return notFound(res, "Story not found");
    }

    story.viewCount += 1;
    await story.save();

    return success(res, "Success", story);
  } catch (err) {
    return serverError(res, err.message, err.message);
  }
};

const getUserStories = async (req, res) => {
  try {
    const email = req.query.email;
    const user = await User.findOne({ email });
    if (!user) {
      return notFound(res, "User not found");
    }

    const stories = await Story.find({ user: user._id })
      .sort({ createdAt: -1 });
    return success(res, "Success", stories);
  } catch (err) {
    return serverError(res, err.message, err.message);
  }
};

const createStory = async (req, res) => {
  try {
    const story = new Story(req.body);
    await story.save();

    const populated = await Story.findById(story._id)
      .populate("user", "name photo");

    return success(res, "Created", populated, 201);
  } catch (err) {
    return serverError(res, err.message, err.message);
  }
};

const updateStory = async (req, res) => {
  try {
    const story = await Story.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate("user", "name photo");

    if (!story) {
      return notFound(res, "Story not found");
    }
    return success(res, "Success", story);
  } catch (err) {
    return serverError(res, err.message, err.message);
  }
};

const deleteStory = async (req, res) => {
  try {
    const story = await Story.findByIdAndDelete(req.params.id);
    if (!story) {
      return notFound(res, "Story not found");
    }
    return success(res, "Story deleted");
  } catch (err) {
    return serverError(res, err.message, err.message);
  }
};

const toggleLike = async (req, res) => {
  try {
    const { storyId, userId } = req.body;
    const story = await Story.findById(storyId);

    if (!story) {
      return notFound(res, "Story not found");
    }

    const likeIndex = story.likes.indexOf(userId);
    if (likeIndex > -1) {
      story.likes.splice(likeIndex, 1);
    } else {
      story.likes.push(userId);
    }

    await story.save();
    return success(res, "Success", { likes: story.likes.length, liked: likeIndex === -1 });
  } catch (err) {
    return serverError(res, err.message, err.message);
  }
};

module.exports = {
  getStories,
  getStoryById,
  getUserStories,
  createStory,
  updateStory,
  deleteStory,
  toggleLike,
};
