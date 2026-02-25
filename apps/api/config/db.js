const mongoose = require("mongoose");
const dns = require("dns");
require("dotenv").config();


dns.setServers(["8.8.8.8", "8.8.4.4"]);


const uri =
  process.env.MONGO_URI ||
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST || "cluster0.crat2tn.mongodb.net"}/tourDb?retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      family: 4, 
      serverSelectionTimeoutMS: 10000,
    });
    console.log("MongoDB connected successfully with Mongoose");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
