import { Router } from "express";
const router = Router();
import FiloController from "../controllers/FiloController.mjs";

router.get("/read", FiloController.read);

export default router;