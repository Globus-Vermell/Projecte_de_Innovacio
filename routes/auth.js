import express from "express";
import { AuthController } from "../controllers/AuthController.js";

const router = express.Router();

router.get("/", AuthController.loginForm);
router.post("/", AuthController.login);
router.get("/logout", AuthController.logout);

export default router;