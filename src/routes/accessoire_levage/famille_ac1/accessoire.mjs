import { Router } from "express";
const router = Router();
import AccessoireController from "../../../controllers/accessoire_levage/famille_ac1/AccessoireController.mjs";

router.post("/create", AccessoireController.create);

export default router;