import { Router } from "express";
import { generateResponse } from "../handlers/generation";
import { isAuthenticated } from "../middlewares";

const router = Router();

// Prefix "/api/generation"
router.post('/', isAuthenticated, generateResponse);

export default router;
