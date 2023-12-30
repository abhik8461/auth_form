import express from "express";
import auth from "./../controllers/authController.js";
const router = express.Router();

router.post("/login", auth.login);
router.post("/register", auth.create_user);
router.get("/verify_email", auth.verifyEmail);

export default router;
