import { Router } from "express";
const router = Router();
import FicheController from "../../../controllers/accessoire_levage/famille_ac1/FicheController.mjs";

router.post("/create", FicheController.create);
router.delete("/reset/:observateurId", FicheController.reset);
router.get("/:observateurId", FicheController.select);

export default router;