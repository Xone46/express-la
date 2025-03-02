import { Router } from "express";
const router = Router();
import BdController from "../controllers/BdController.mjs";

router.get("/sauvgarder", BdController.sauvegarder);
router.get("/restorer", BdController.restaurer);
router.get("/read", BdController.read);

export default router;