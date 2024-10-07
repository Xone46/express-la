import { Router } from "express";
const router = Router();
import DescriptionsController from "../../../controllers/appareil_levage/famille4_lev4/DescriptionsController.mjs";
import { query, body, validationResult, matchedData, checkSchema } from "express-validator"
// import { validationRenseignementSchemas } from "../utils/validationRenseignementSchemas.mjs"
import { resolveTypesDataDescription } from "../../../middelwares/description/resolveTypesDataDescription.mjs"

router.post("/create", DescriptionsController.create);
router.get("/:observateurId", DescriptionsController.select);
router.delete("/reset/:observateurId", DescriptionsController.reset);

export default router;