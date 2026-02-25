const Comment = require("../../models/comment");

const postComment = async (req, res) => {
  try {
    const comment = new Comment(req.body);
    await comment.save();
    
    const populated = await Comment.findById(comment._id)
      .populate("user", "name photo");
    
    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getComments = async (req, res) => {
  try {
    const { storyId } = req.query;
    const filter = storyId ? { story: storyId, isApproved: true } : { isApproved: true };
    
    const comments = await Comment.find(filter)
      .populate("user", "name photo")
      .sort({ createdAt: -1 });
    
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.json({ message: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  postComment,
  getComments,
  deleteComment,
};
