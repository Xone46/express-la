import { Router } from "express";
const router = Router();
import InterventionController from "../controllers/InterventionController.mjs";
import { query, body, validationResult, matchedData, checkSchema } from "express-validator"
import { validationInspecteurSchemas } from "../utils/validationInspecteurSchemas.mjs"
import { resolveIndexByUserId } from "../middelwares/users/resolveIndexByUserId.mjs"

router.post("/create", InterventionController.create);
router.put("/update", InterventionController.update);
router.delete("/delete", InterventionController.deleteOne);
router.get("/", InterventionController.read);

export default router;