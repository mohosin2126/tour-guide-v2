const Comment = require("../../models/comment");
const { success, notFound, serverError } = require("../../utils/response");

const postComment = async (req, res) => {
  try {
    const comment = new Comment(req.body);
    await comment.save();

    const populated = await Comment.findById(comment._id)
      .populate("user", "name photo");

    return success(res, "Created", populated, 201);
  } catch (err) {
    return serverError(res, err.message, err.message);
  }
};

const getComments = async (req, res) => {
  try {
    const { storyId } = req.query;
    const filter = storyId ? { story: storyId, isApproved: true } : { isApproved: true };

    const comments = await Comment.find(filter)
      .populate("user", "name photo")
      .sort({ createdAt: -1 });

    return success(res, "Success", comments);
  } catch (err) {
    return serverError(res, err.message, err.message);
  }
};

const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) {
      return notFound(res, "Comment not found");
    }
    return success(res, "Comment deleted");
  } catch (err) {
    return serverError(res, err.message, err.message);
  }
};

module.exports = {
  postComment,
  getComments,
  deleteComment,
};
