import { Router } from "express";
const router = Router();
import PhotoController from "../../../controllers/accessoire_levage/famille_ac1/PhotoController.mjs";

router.post("/create", PhotoController.create);

export default router;