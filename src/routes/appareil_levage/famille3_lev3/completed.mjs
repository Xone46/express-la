import { Router } from "express";
const router = Router();
import CompletedController from "../../../controllers/appareil_levage/famille3_lev3/CompletedController.mjs";

router.get("/", CompletedController.read);
router.get("/:observateurId", CompletedController.checkRenseignement);
router.get("/checkAll/:observateurId", CompletedController.checkAll);


export default router;