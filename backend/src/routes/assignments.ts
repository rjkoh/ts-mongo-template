import { Router } from "express";
import { createAssignmentHandler, getAllAssignmentsHandler } from "../handlers/assignments";
import { isAuthenticated } from "../middlewares";

const router = Router();

// Prefix "/api/assignments"
router.get('/', isAuthenticated, getAllAssignmentsHandler);
router.post('/', isAuthenticated, createAssignmentHandler);

export default router;
