const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  story: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Story",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000,
  },
  isApproved: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

commentSchema.pre("save", function () {
  this.updatedAt = Date.now();
});

commentSchema.index({ story: 1, createdAt: -1 });

module.exports = mongoose.model("Comment", commentSchema);
