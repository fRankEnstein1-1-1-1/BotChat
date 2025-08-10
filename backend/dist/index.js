// src/index.ts
import dotenv from 'dotenv';
dotenv.config(); // ✅ Load env FIRST
import app from "./app.js";
import { connectToDatabase } from "./db/connections.js";
// ✅ Log key status
console.log("GEMINI_API_KEY (from index.ts):", process.env.GEMINI_API_KEY ? "YES ✅" : "NO ❌");
// ✅ Optional Gemini model checker
/* async function listGeminiModels() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("❌ GEMINI_API_KEY is missing in .env");
    return;
  }

  const url = 'https://generativelanguage.googleapis.com/v1/models';
  
  try {
    const response = await fetch(`${url}?key=${apiKey}`);
    if (!response.ok) {
      throw new Error(`❌ HTTP ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    console.log("📦 Available Gemini Models:");
    data.models?.forEach((model: any) => {
      console.log(`- ${model.name}`);
    });
  } catch (err) {
    console.error("❌ Error fetching Gemini models:", err);
  }
}
 */
// ✅ Run DB + server
connectToDatabase()
    .then(async () => {
    /*  await listGeminiModels(); */ // ✅ Log Gemini models on startup
    app.listen(process.env.PORT || 5000, () => console.log('✅ Server running and connected with MongoDB'));
})
    .catch((error) => console.error("❌ DB connection failed:", error));
//# sourceMappingURL=index.js.map