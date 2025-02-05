import { Router } from "express";
const router = Router();
import ReserveController from "../controllers/ReserveController.mjs";

router.get("/read", ReserveController.read);

export default router;