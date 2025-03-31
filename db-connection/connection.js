require('dotenv').config();
const mongoose = require("mongoose");

const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/myDatabase";

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true, // Optional (not required in latest Mongoose)
      useUnifiedTopology: true, // Optional (not required in latest Mongoose)
    });
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error);
    process.exit(1); // Stop the process if DB connection fails
  }
};

module.exports = connectDB;
