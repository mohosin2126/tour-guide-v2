const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();
const connectDB = require("./config/db");
const seedDatabase = require("./scripts/seed");


app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000"],
  credentials: true,
}));
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});


const authRoutes = require("./routes/auth/index");
const bookingRoutes = require("./routes/booking/index");
const categoryRoutes = require("./routes/category/index");
const commentRoutes = require("./routes/comment/index");
const guideRoutes = require("./routes/guide/index");
const storyRoutes = require("./routes/story/index");
const userRoutes = require("./routes/user/index");
const wishlistRoutes = require("./routes/wishlist/index");
const packageRoutes = require("./routes/package/index");
const reviewRoutes = require("./routes/review/index");
const contactRoutes = require("./routes/contact/index");


app.get("/", (req, res) => {
  res.json({ message: "Tour Guide API is running", status: "ok" });
});

app.use("/auth", authRoutes);
app.use("/bookings", bookingRoutes);
app.use("/categories", categoryRoutes);
app.use("/comments", commentRoutes);
app.use("/guides", guideRoutes);
app.use("/stories", storyRoutes);
app.use("/users", userRoutes);
app.use("/wishlists", wishlistRoutes);
app.use("/packages", packageRoutes);
app.use("/reviews", reviewRoutes);
app.use("/contacts", contactRoutes);

// 404 
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({
    error: err.message || "Internal server error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack })
  });
});


(async () => {
  try {
    await connectDB();
    await seedDatabase();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
})();
