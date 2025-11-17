// Simple Express server for Acquire Commercial Intel backend
const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(express.json());

// Load Google API key from Render environment variables
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// Home route
app.get("/", (req, res) => {
  res.send("Acquire Commercial Intel backend is running 🚀");
});

// POST /ai/analyse route
app.post("/ai/analyse", async (req, res) => {
  try {
    const userText = req.body.text;

    if (!userText) {
      return res.status(400).json({ error: "No text provided" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(userText);
    const response = await result.response;
    const text = response.text();

    res.json({ reply: text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI request failed" });
  }
});

// Port for Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
