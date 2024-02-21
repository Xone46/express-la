import { Router } from "express"
const router = Router();
import userController from "../controllers/userController.mjs"
import { query, body, validationResult, matchedData, checkSchema } from "express-validator"
import { validationUserSchema } from "../utils/validationSchemas.mjs"
import { resolveIndexByUserId } from "../middelwares/users/resolveIndexByUserId.mjs"

router.post("/", checkSchema(validationUserSchema), userController.create)
router.get("/", userController.read)
router.delete("/:id", userController.deleteOne)
router.put("/:id", userController.update)
router.patch("/:id", resolveIndexByUserId, userController.updateName)
router.get("/:id", userController.select)

export default router