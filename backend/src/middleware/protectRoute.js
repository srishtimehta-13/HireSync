import { requireAuth } from "@clerk/express";
import User from "../models/User.js";
import { syncClerkUserById } from "../lib/userSync.js";

export const protectRoute = [
  requireAuth(),
  async (req, res, next) => {
    try {
      const auth = typeof req.auth === "function" ? req.auth() : req.auth;
      const clerkId = auth?.userId;

      if (!clerkId) return res.status(401).json({ message: "Unauthorized - invalid token" });

      let user = await User.findOne({ clerkId });

      if (!user) {
        user = await syncClerkUserById(clerkId);
      }

      // attach user to req
      req.user = user;

      next();
    } catch (error) {
      console.error("Error in protectRoute middleware", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
];