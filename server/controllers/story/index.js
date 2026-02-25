const Story = require("../../models/story");
const User = require("../../models/user");

const getStories = async (req, res) => {
  try {
    const stories = await Story.find({ isPublished: true, isApproved: true })
      .populate("user", "name photo")
      .sort({ createdAt: -1 });
    res.json(stories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getStoryById = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id)
      .populate("user", "name photo bio");
    
    if (!story) {
      return res.status(404).json({ error: "Story not found" });
    }
    
    story.viewCount += 1;
    await story.save();
    
    res.json(story);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserStories = async (req, res) => {
  try {
    const email = req.query.email;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    const stories = await Story.find({ user: user._id })
      .sort({ createdAt: -1 });
    res.json(stories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createStory = async (req, res) => {
  try {
    const story = new Story(req.body);
    await story.save();
    
    const populated = await Story.findById(story._id)
      .populate("user", "name photo");
    
    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
      return res.status(404).json({ error: "Story not found" });
    }
    res.json(story);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteStory = async (req, res) => {
  try {
    const story = await Story.findByIdAndDelete(req.params.id);
    if (!story) {
      return res.status(404).json({ error: "Story not found" });
    }
    res.json({ message: "Story deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const toggleLike = async (req, res) => {
  try {
    const { storyId, userId } = req.body;
    const story = await Story.findById(storyId);
    
    if (!story) {
      return res.status(404).json({ error: "Story not found" });
    }
    
    const likeIndex = story.likes.indexOf(userId);
    if (likeIndex > -1) {
      story.likes.splice(likeIndex, 1);
    } else {
      story.likes.push(userId);
    }
    
    await story.save();
    res.json({ likes: story.likes.length, liked: likeIndex === -1 });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
