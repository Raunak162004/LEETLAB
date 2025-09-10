import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { executeCode,submitCode } from "../controllers/executeCode.controller.js";
const executionRoutes = express.Router();

executionRoutes.post("/", authMiddleware, executeCode);
executionRoutes.post("/submit-code", authMiddleware, submitCode);

export default executionRoutes;