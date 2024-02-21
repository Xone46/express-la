import { Router } from "express";
const router = Router();
import AuthController from "../controllers/AuthController.mjs";

router.post("/", AuthController.login);
router.get("/status", AuthController.status);

export default router;