import { Router } from "express";
import { getUser } from "../controllers/users.controllers.js";
const router = Router();

// Routes for users API
router.post("/username", getUser);

export default router;
