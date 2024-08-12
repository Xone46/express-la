import { Router } from "express";
const router = Router();
import FicheController from "../../../controllers/accessoire_levage/famille_ac1/FicheController.mjs";

router.post("/create", FicheController.create);

export default router;