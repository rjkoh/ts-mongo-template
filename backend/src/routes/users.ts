import { Router } from "express";
import { getUserByIdHandler, getUsersHandler, registerUserHandler, loginUserHandler } from "../handlers/users";

const router = Router();

// Prefix "/api/users"
router.get("/", getUsersHandler);
router.get("/:id", getUserByIdHandler);
router.post('/', registerUserHandler);
router.post('/login', loginUserHandler);

export default router;
