import { Router } from "express";
const router = Router();
import CommentaireController from "../controllers/CommentaireController.mjs";


router.post("/create", CommentaireController.create);
router.post("/", CommentaireController.select);
router.post("/supprimer", CommentaireController.supprimer);
router.delete("/:commentaireId", CommentaireController.deleteOne);
router.delete("/:ref/:observateurId", CommentaireController.deleteByRefAndObservateurId);
router.get("/:observateurId", CommentaireController.readCommentaires);
router.delete("/:ref/:number/:titre/:index/:observateurId", CommentaireController.deleteByIndexAndRef);

export default router;