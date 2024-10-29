import { Router } from "express";
const router = Router();
import ExamenController from "../../../controllers/appareil_levage/famille2_lev2/ExamenController.mjs";
import { resolveTypesDataExamen } from "../../../middelwares/examens/resolveTypesDataExamen.mjs"

router.post("/create", resolveTypesDataExamen, ExamenController.create);
router.get("/:observateurId", ExamenController.select);
router.delete("/:observateurId", ExamenController.reset);
router.post("/updateStatus", ExamenController.updateStatus);
router.post("/changeStatusCritique", ExamenController.changeStatusCritique);
router.delete("/deleteAllCommentairesExamen/:observateurId", ExamenController.deleteAllCommentairesExamen);

export default router;