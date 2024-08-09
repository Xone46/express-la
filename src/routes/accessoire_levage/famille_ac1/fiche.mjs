import { Router } from "express";
const router = Router();
import ExamenController from "../../../controllers/accessoire_levage/famille_ac1/ExamenController.mjs";

router.post("/create", ExamenController.create);
router.post("/", ExamenController.read);
router.post("/supprimer", ExamenController.update);
router.delete("/:commentaireId", ExamenController.deleteOne);

export default router;