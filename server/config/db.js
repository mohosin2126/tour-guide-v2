const mongoose = require("mongoose");
const dns = require("dns");
require("dotenv").config();

// Force DNS to use Google — fixes SRV lookup failures on some Windows networks
dns.setServers(["8.8.8.8", "8.8.4.4"]);

// Prefer a full MONGO_URI if provided; otherwise build from DB_USER / DB_PASS / DB_HOST
const uri =
  process.env.MONGO_URI ||
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST || "cluster0.crat2tn.mongodb.net"}/tourDb?retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      family: 4, // force IPv4
      serverSelectionTimeoutMS: 10000,
    });
    console.log("MongoDB connected successfully with Mongoose");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
