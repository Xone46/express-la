import { Router } from "express";
const router = Router();
import CommentaireController from "../controllers/CommentaireController.mjs";

router.post("/create", CommentaireController.create);
router.post("/", CommentaireController.select);

export default router;