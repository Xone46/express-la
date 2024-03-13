import { Router } from "express";
const router = Router();
import ConclusionController from "../controllers/ConclusionController.mjs";

router.post("/create", ConclusionController.create);
router.get("/:observateurId", ConclusionController.select);
router.put("/update/:observateurId", ConclusionController.update);

export default router;