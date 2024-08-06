import { Router } from "express";
const router = Router();
import levageAController from "../../controllers/gth_famille_ac1/levageAController.mjs";
// import { resolveTypesDataRenseignement } from "../middelwares/renseignement/resolveTypesDataRenseignement.mjs"


// 
router.post("/create", levageAController.create);
router.delete("/reset/:observateurId", levageAController.reset);
router.get("/:observateurId", levageAController.select);

router.get("/completeds/", levageAController.read);
router.get("/completeds/:observateurId", levageAController.checkRenseignement);




export default router;