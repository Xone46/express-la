import { Router } from "express";
const router = Router();
import InterventionController from "../controllers/InterventionController.mjs";
import { query, body, validationResult, matchedData, checkSchema } from "express-validator"
// import { validationRenseignementSchemas } from "../utils/validationRenseignementSchemas.mjs"
import { resolveTypesDataRenseignement } from "../middelwares/renseignement/resolveTypesDataRenseignement.mjs"

router.post("/create", resolveTypesDataRenseignement, InterventionController.create);


export default router;