const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200,
  },
  content: {
    type: String,
    required: true,
  },
  images: [{
    type: String,
  }],
  coverImage: {
    type: String,
    default: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800",
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
  isPublished: {
    type: Boolean,
    default: true,
  },
  isApproved: {
    type: Boolean,
    default: true,
  },
  viewCount: {
    type: Number,
    default: 0,
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

storySchema.pre("save", function () {
  this.updatedAt = Date.now();
});

storySchema.index({ title: "text", content: "text" });
storySchema.index({ createdAt: -1 });

module.exports = mongoose.model("Story", storySchema);
