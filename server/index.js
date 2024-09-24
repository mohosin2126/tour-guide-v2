const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();

app.use(express.json());

// Import routes
const authRoutes = require("./routes/auth/index");
const bookingRoutes = require("./routes/booking/index");
const categoryRoutes = require("./routes/category/index");
const commentRoutes = require("./routes/comment/index");
const guideRoutes = require("./routes/guide/index");
const storyRoutes = require("./routes/story/index");
const userRoutes = require("./routes/user/index");
const wishlistRoutes = require("./routes/wishlist/index");

// Use routes
app.use("/auth", authRoutes);
app.use("/bookings", bookingRoutes);
app.use("/categories", categoryRoutes);
app.use("/comments", commentRoutes);
app.use("/guides", guideRoutes);
app.use("/stories", storyRoutes);
app.use("/users", userRoutes);
app.use("/wishlists", wishlistRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
