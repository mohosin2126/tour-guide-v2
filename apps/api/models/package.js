const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  duration: {
    type: Number,
    required: true,
    min: 1,
  },
  maxGroupSize: {
    type: Number,
    required: true,
    min: 1,
    default: 10,
  },
  difficulty: {
    type: String,
    enum: ["easy", "moderate", "difficult"],
    default: "moderate",
  },
  images: [{
    type: String,
  }],
  coverImage: {
    type: String,
    default: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800",
  },
  activities: [{
    day: Number,
    title: String,
    description: String,
  }],
  tourType: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  guide: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  locations: [{
    type: String,
  }],
  startLocation: {
    type: String,
  },
  availability: {
    type: Boolean,
    default: true,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  totalBookings: {
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

packageSchema.pre("save", function () {
  this.updatedAt = Date.now();
});

packageSchema.index({ title: "text", description: "text" });
packageSchema.index({ price: 1, rating: -1 });

module.exports = mongoose.model("Package", packageSchema);
