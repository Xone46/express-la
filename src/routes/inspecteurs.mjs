import { Router } from "express";
const router = Router();
import InspecteurController from "../controllers/InspecteurController.mjs";
import { query, body, validationResult, matchedData, checkSchema } from "express-validator"
import { validationInspecteurSchemas } from "../utils/validationInspecteurSchemas.mjs"
import { resolveIndexByUserId } from "../middelwares/users/resolveIndexByUserId.mjs"

router.post("/connexion", checkSchema(validationInspecteurSchemas), InspecteurController.connexion);

export default router;