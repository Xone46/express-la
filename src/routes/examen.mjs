import { Router } from "express";
const router = Router();
import ExamenController from "../controllers/ExamenController.mjs";
import { resolveTypesDataExamen } from "../middelwares/examens/resolveTypesDataExamen.mjs"

router.post("/create", resolveTypesDataExamen, ExamenController.create);


export default router;