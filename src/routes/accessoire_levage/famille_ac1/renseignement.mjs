import { Router } from "express";
const router = Router();
import RenseignementController from "../../../controllers/accessoire_levage/famille_ac1/RenseignementController.mjs";

router.post("/create", RenseignementController.create);

export default router;