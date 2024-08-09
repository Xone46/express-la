import { Router } from "express";
const router = Router();
import AccessoireController from "../../../controllers/accessoire_levage/famille_ac1/AccessoireController.mjs";

router.post("/create", AccessoireController.create);
router.post("/", AccessoireController.read);
router.post("/supprimer", AccessoireController.update);
router.delete("/:commentaireId", AccessoireController.deleteOne);

export default router;