import express from "express";
import path from "path";
import cors from "cors";
import { serve } from "inngest/express";
import { clerkMiddleware } from "@clerk/express";

import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import { inngest, functions } from "./lib/inngest.js";

import chatRoutes from "./routes/chatRoutes.js";
import sessionRoutes from "./routes/sessionRoute.js";

const app = express();

const __dirname = path.resolve();

import fs from "fs";

// middleware
app.use(express.json());

// Dynamic CORS configuration for Vercel and local development
const clientUrl = ENV.CLIENT_URL;
const allowedOrigins = [
  clientUrl,
  "http://localhost:5173",
  "http://localhost:3000",
  "http://127.0.0.1:5173",
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like curl, Postman, server-to-server)
      if (!origin) return callback(null, true);
      if (
        allowedOrigins.includes(origin) ||
        ENV.NODE_ENV !== "production"
      ) {
        return callback(null, origin);
      }
      return callback(new Error("Origin is not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(clerkMiddleware()); // this adds auth field to request object: req.auth()

app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes);
app.use("/api/sessions", sessionRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", msg: "HireSync API is up and running" });
});

// Root route for Render backend service status
app.get("/", (req, res) => {
  res.status(200).json({
    service: "HireSync Backend API",
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
});

// If monolithic frontend build exists locally, serve it; otherwise backend acts as pure API on Render
const frontendDist = path.join(__dirname, "../frontend/dist");
if (ENV.NODE_ENV === "production" && fs.existsSync(frontendDist)) {
  app.use(express.static(frontendDist));
  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendDist, "index.html"));
  });
}

const PORT = process.env.PORT || ENV.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log("Server is running on port:", PORT));
  } catch (error) {
    console.error("💥 Error starting the server", error);
  }
};

startServer();