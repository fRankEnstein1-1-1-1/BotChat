// src/config/geminiconfig.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
export function getGeminiModel() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error("GEMINI_API_KEY is not set! Please check your .env file and dotenv configuration.");
        // Throwing an error here prevents the application from trying to proceed with an invalid key
        throw new Error("GEMINI_API_KEY environment variable is missing.");
    }
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); // Or "gemini-pro" for testing
    return model;
}
//# sourceMappingURL=geminiconfig.js.map