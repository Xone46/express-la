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
router.get("/readTerminer", ObservateurCotroller.readTerminer);
router.get("/:interventionId", ObservateurCotroller.select);
router.get("/apercu/:observateurId/:inspecteurId", ObservateurCotroller.apercu);
router.get("/send/:observateurId/:inspecteurId/:ip", ObservateurCotroller.envoyer);
router.get("/selected/:observateurId", ObservateurCotroller.selected);
router.put("/terminer/:observateurId", ObservateurCotroller.terminer);
router.put("/cacher/:observateurId", ObservateurCotroller.cacher);

export default router;