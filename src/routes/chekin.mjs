import { Router } from "express";
const router = Router();
import ChekinController from "../controllers/ChekinController.mjs";

router.post("/status", ChekinController.status);
router.get("/sauvgarde/:inspecteurId", ChekinController.sauvgarde);

export default router;