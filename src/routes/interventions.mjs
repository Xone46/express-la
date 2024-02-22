import { Router } from "express";
const router = Router();
import InterventionController from "../controllers/InterventionController.mjs";
import { query, body, validationResult, matchedData, checkSchema } from "express-validator"
import { validationInterventionSchemas } from "../utils/validationInterventionSchemas.mjs"
import { resolveTypesDataIntervention } from "../middelwares/intervention/resolveTypesDataIntervention.mjs"

router.post("/create", resolveTypesDataIntervention, checkSchema(validationInterventionSchemas), InterventionController.create);
router.put("/:interventionsId", InterventionController.update);
router.delete("/:interventionId", InterventionController.deleteOne);
router.get("/read", InterventionController.read);

export default router;