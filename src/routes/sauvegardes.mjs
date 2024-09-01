import { Router } from "express";
const router = Router();
import SauvegardeController from "../controllers/SauvegardeController.mjs";

router.delete("/:inspecteurId", SauvegardeController.deleteOne);

export default router;