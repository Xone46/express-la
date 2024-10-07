import { Router } from "express";
const router = Router();
import CommentaireController from "../../../controllers/appareil_levage/famille3_lev3/CommentaireController.mjs";

router.post("/create", CommentaireController.create);
router.post("/", CommentaireController.select);
router.post("/supprimer", CommentaireController.supprimer);
router.delete("/:commentaireId", CommentaireController.deleteOne);
router.delete("/:ref/:observateurId", CommentaireController.deleteByRefAndObservateurId);
router.get("/:observateurId", CommentaireController.readCommentaires);

export default router;