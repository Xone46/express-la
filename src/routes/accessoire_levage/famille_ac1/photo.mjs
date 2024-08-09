import { Router } from "express";
const router = Router();
import PhotoController from "../../../controllers/accessoire_levage/famille_ac1/PhotoController.mjs";

router.post("/create", PhotoController.create);
router.post("/", PhotoController.read);
router.post("/supprimer", PhotoController.update);
router.delete("/:commentaireId", PhotoController.deleteOne);

export default router;