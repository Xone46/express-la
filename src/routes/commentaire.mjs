import { Router } from "express";
const router = Router();
import CommentaireController from "../controllers/CommentaireController.mjs";

router.post("/create", CommentaireController.create);
router.post("/", CommentaireController.select);
router.delete("/:commentaireId", CommentaireController.deleteOne);
router.get("/:observateurId", CommentaireController.readCommentaires);

export default router;