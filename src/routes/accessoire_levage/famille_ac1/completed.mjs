import { Router } from "express";
const router = Router();
import CompletedController from "../../../controllers/accessoire_levage/famille_ac1/CompletedController.mjs";

router.post("/create", CompletedController.create);
router.post("/", CompletedController.read);
router.post("/supprimer", CompletedController.update);
router.delete("/:commentaireId", CompletedController.deleteOne);

export default router;