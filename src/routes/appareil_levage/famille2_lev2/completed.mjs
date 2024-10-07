import { Router } from "express";
const router = Router();
import CompletedController from "../../../controllers/appareil_levage/famille2_lev2/CompletedController.mjs";

router.get("/", CompletedController.read);
router.get("/:observateurId", CompletedController.checkRenseignement);

export default router;