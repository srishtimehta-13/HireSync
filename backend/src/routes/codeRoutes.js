import express from "express";
import { requireAuth } from "@clerk/express";
import { executeCode } from "../controllers/codeController.js";

const router = express.Router();

router.post("/execute", requireAuth(), executeCode);

export default router;
