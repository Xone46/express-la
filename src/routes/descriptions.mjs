import { Router } from "express";
const router = Router();
import DescriptionsController from "../controllers/DescriptionsController.mjs";
import { query, body, validationResult, matchedData, checkSchema } from "express-validator"
// import { validationRenseignementSchemas } from "../utils/validationRenseignementSchemas.mjs"
import { resolveTypesDataDescription } from "../middelwares/description/resolveTypesDataDescription.mjs"

router.post("/create", resolveTypesDataDescription, DescriptionsController.create);
router.get("/:observateurId", DescriptionsController.select);

export default router;