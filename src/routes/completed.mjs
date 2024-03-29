import { Router } from "express";
const router = Router();
import CompletedController from "../controllers/CompletedController.mjs";

router.get("/", CompletedController.read);

export default router;