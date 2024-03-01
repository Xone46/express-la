import { Router } from "express";
const router = Router();
import ConclusionController from "../controllers/ConclusionController.mjs";

router.post("/create", ConclusionController.create);
router.get("/:observateurId", ConclusionController.select);

export default router;