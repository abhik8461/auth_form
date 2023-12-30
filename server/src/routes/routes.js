import express from "express";
import { createUser, login } from "../controllers/authController.js";
const router = express.Router();

router.post("/login", login);
router.post("/register", createUser);

export default router;
