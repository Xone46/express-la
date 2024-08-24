import { Router } from "express";
const router = Router();
import RenseignementController from "../../../controllers/appareil_levage/famille1_lev1/RenseignementController.mjs";
import { query, body, validationResult, matchedData, checkSchema } from "express-validator"
// import { validationRenseignementSchemas } from "../utils/validationRenseignementSchemas.mjs"
// import { resolveTypesDataRenseignement } from "../../../middelwares/renseignement/resolveTypesDataRenseignement.mjs"

router.post("/create", RenseignementController.create);
router.delete("/reset/:observateurId", RenseignementController.reset);
router.get("/:observateurId", RenseignementController.select);

export default router;