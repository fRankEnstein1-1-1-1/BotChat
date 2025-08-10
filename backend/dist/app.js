// src/app.ts
import express from "express";
import morgan from "morgan";
// import { config } from "dotenv"; // Already removed, good!
// config();
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors"; // Ensure this is imported
const app = express();
// CORS Configuration - Make sure this is high up, before routes
app.use(cors({
    origin: "http://localhost:5173", // Your frontend origin
    credentials: true, // Allow cookies to be sent
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Explicitly allow OPTIONS
    allowedHeaders: ["Content-Type", "Authorization"], // Allow these headers
}));
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser(process.env.COOKIE_SECRET || "some-default-secret"));
app.use("/api/v1", appRouter);
export default app;
//# sourceMappingURL=app.js.map