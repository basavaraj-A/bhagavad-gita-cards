const express = require("express");
const routes = require("./routes");

const app = express();

// Global middleware
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
