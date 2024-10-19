import { Router } from "express";
const router = Router();
import ConclusionController from "../../../controllers/appareil_levage/famille4_lev4/ConclusionController.mjs";

router.post("/create", ConclusionController.create);
router.get("/:observateurId", ConclusionController.select);
router.delete("/reset/:observateurId", ConclusionController.reset);

export default router;