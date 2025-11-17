// Simple Express server for Acquire Commercial Intel backend

const express = require("express");
const bodyParser = require("body-parser");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();

// Allow JSON body input
app.use(bodyParser.json());

// Basic home route
app.get("/", (req, res) => {
  res.send("Acquire Commercial Intel backend is running 🚀");
});

// POST AI analysis route
app.post("/ai/analyse", async (req, res) => {
  try {
    const userText = req.body.text;

    if (!userText) {
      return res.status(400).json({ error: "Missing 'text' in request body" });
    }

    // Initialise Google Gemini API using your Render environment variable
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(userText);
    const aiResponse = await result.response.text();

    res.json({ response: aiResponse });

  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ error: "AI request failed" });
  }
});

// Port for Render (or local testing)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
