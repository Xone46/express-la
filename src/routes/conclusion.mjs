import { Router } from "express";
const router = Router();
import ConclusionController from "../controllers/ConclusionController.mjs";

router.post("/create", ConclusionController.create);

export default router;