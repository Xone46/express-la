import { Router } from "express";
const router = Router();
import FiloController from "../controllers/FiloController.mjs";

router.get("/read", FiloController.read);
router.post("/select", FiloController.select);

export default router;