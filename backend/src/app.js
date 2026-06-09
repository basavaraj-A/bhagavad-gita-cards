const express = require("express");
const routes = require("./routes");
const cors = require("cors");

const app = express();

// Global middleware
app.use(cors({ origin: "http://localhost:5173" })); 
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Backend is running",
  });
});

// API routes
app.use("/api", routes);

module.exports = app;
