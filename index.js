require('dotenv').config();
const cors = require("cors");
const express = require("express");
const app = express();
const connection = require("./db-connection/connection");
const router = require("./routes/router");
const allTransactionRoute = require("./routes/all-transactions");
const statRoute = require("./routes/fetch-statistics");
const priceRoute = require("./routes/price-range-statistics");
const categoryRoute = require("./routes/category-distribution");
const transactionRoute = require("./routes/combine-data-route");

const PORT = process.env.PORT || 5000; // Render dynamically assigns a PORT

const corsOptions = {
  origin: "http://localhost:3000", // Change this to your frontend's deployed URL
  methods: "POST,GET,PUT,DELETE,PATCH,HEAD",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

// Use Routes
app.use("/", router);
app.use("/", allTransactionRoute);
app.use("/", statRoute);
app.use("/", priceRoute);
app.use("/", categoryRoute);
app.use("/", transactionRoute);

// Establish DB Connection
connection()
  .then(() => {
    console.log("Your database connected");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

// Ensure Render detects the port binding
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
