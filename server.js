// Simple Express server for Acquire Commercial Intel backend

const express = require("express");
const app = express();

// Basic home route
app.get("/", (req, res) => {

  res.send("Acquire Commercial Intel backend is running 🚀");
});

// Port for Render (or local testing)
const PORT = process.env.PORT || 3000;
// Google AI Setup
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// AI analyse endpoint
app.post("/ai/analyse", express.json(), async (req, res) => {
  try {
    const text = req.body.text;

    if (!text) {
      return res.status(400).json({ error: "Missing text input" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            { text: `Analyse this content and extract useful commercial property intelligence. 
                      Return findings in structured JSON.
                      Content: ${text}` }
          ]
        }
      ]
    });

    const reply = result.response.text();
    res.json({ analysis: reply });

  } catch (error) {
    console.error("AI error:", error);
    res.status(500).json({ error: "AI request failed", details: error.toString() });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
