import { Router } from "express";
const router = Router();
import ObservateurCotroller from "../controllers/ObservateurCotroller.mjs";
import { query, body, validationResult, matchedData, checkSchema } from "express-validator"
import { validationObservateurSchemas } from "../utils/validationObservateurSchemas.mjs"
import { resolveTypesDataObservateur } from "../middelwares/observateur/resolveTypesDataObservateur.mjs"

router.post("/create", resolveTypesDataObservateur, checkSchema(validationObservateurSchemas), ObservateurCotroller.create);
router.put("/:observateurId", ObservateurCotroller.update);
router.delete("/:observateurId", ObservateurCotroller.deleteOne);
router.get("/", ObservateurCotroller.read);
router.get("/:observateurId", ObservateurCotroller.select);
router.get("/apercu/:observateurId/:interventionId/:inspecteurId", ObservateurCotroller.apercu);

export default router;