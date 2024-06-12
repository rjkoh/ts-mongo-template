import { Router } from "express";
import { createAssignmentHandler } from "../handlers/assignments";
import { isAuthenticated } from "../middlewares";

const router = Router();

// Prefix "/api/assignments"
router.post('/', isAuthenticated, createAssignmentHandler);

export default router;
