require('dotenv').config();
const cors = require("cors");
const express = require("express");
const app = express();
const connection = require("./db-connection/connection"); // Ensure this file connects properly
const router = require("./routes/router");
const allTransactionRoute = require("./routes/all-transactions");
const statRoute = require("./routes/fetch-statistics");
const priceRoute = require("./routes/price-range-statistics");
const categoryRoute = require("./routes/category-distribution");
const transactionRoute = require("./routes/combine-data-route");

const PORT = process.env.PORT || 10000; // Use Render’s assigned port

const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:3000", // Change this for deployment
  methods: "POST,GET,PUT,DELETE,PATCH,HEAD",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use("/", router);
app.use("/", allTransactionRoute);
app.use("/", statRoute);
app.use("/", priceRoute);
app.use("/", categoryRoute);
app.use("/", transactionRoute);

// Connect to MongoDB
connection()
  .then(() => console.log("✅ Database connected successfully"))
  .catch((err) => console.error("❌ Database connection error:", err));

// Ensure Render detects the port binding
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
