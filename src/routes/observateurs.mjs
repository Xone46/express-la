import { Router } from "express";
const router = Router();
import ObservateurCotroller from "../controllers/ObservateurCotroller.mjs";
import { query, body, validationResult, matchedData, checkSchema } from "express-validator"
import { validationInterventionSchemas } from "../utils/validationInterventionSchemas.mjs"
import { resolveTypesDataIntervention } from "../middelwares/intervention/resolveTypesDataIntervention.mjs"

router.post("/create", resolveTypesDataIntervention, checkSchema(validationInterventionSchemas), ObservateurCotroller.create);
router.put("/:observateurId", ObservateurCotroller.update);
router.delete("/:observateurId", ObservateurCotroller.deleteOne);
router.get("/", ObservateurCotroller.read);
router.get("/:observateurId", ObservateurCotroller.select);

export default router;