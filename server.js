// Simple Express server for Acquire Commercial Intel backend

const express = require("express");
const app = express();

// Basic home route
app.get("/", (req, res) => {

  res.send("Acquire Commercial Intel backend is running 🚀");
});

// Port for Render (or local testing)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
