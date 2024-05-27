import { Router } from "express";
import { getUserById, getUsers } from "../handlers/users";

const router = Router();

// Prefix "/api/users"
router.get("/", getUsers);
router.get("/:id", getUserById);

export default router;
