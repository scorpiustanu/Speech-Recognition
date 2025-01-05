import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

// Get the API key from environment variables (React requires REACT_APP_ prefix for custom env vars)
const apiKey = import.meta.env.REACT_APP_API_KEY;

if (!apiKey) {
  console.error(
    "API Key is missing. Please set REACT_APP_API_KEY in your .env file."
  );
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 130,
  responseMimeType: "text/plain",
};

async function run(prompt) {
  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chatSession.sendMessage(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error while generating AI response:", error);
    throw new Error("Failed to fetch AI response.");
  }
}

export default run;
