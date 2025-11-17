// Basic Express server for Acquire Commercial Intel
const express = require("express");
const app = express();

// Health check endpoint
app.get("/", (req, res) => {
  res.send("Acquire Commercial Intel Platform is running successfully 🚀");
});

// Use Render's provided port or 3000 locally
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
