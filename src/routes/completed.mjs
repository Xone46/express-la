import { Router } from "express";
const router = Router();
import CompletedController from "../controllers/CompletedController.mjs";

router.get("/", CompletedController.read);
router.get("/:observateurId", CompletedController.checkRenseignement);

export default router;