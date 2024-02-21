import { Router } from "express";
const router = Router();
import ChekinController from "../controllers/ChekinController.mjs";

router.post("/status", ChekinController.status);

export default router;