import { Router } from "express";
const router = Router();
import BdController from "../controllers/BdController.mjs";

router.get("/sauvgarder", BdController.sauvgarder);
router.get("/restorer", BdController.restorer);

export default router;