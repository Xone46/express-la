import { Router } from "express";
const router = Router();
import ConclusionController from "../../../controllers/appareil_levage/famille3_lev3/ConclusionController.mjs";

router.post("/create", ConclusionController.create);
router.get("/:observateurId", ConclusionController.select);
router.delete("/reset/:observateurId", ConclusionController.reset);

export default router;