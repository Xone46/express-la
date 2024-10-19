import { Router } from "express";
import { PhotoFamilleFiveLevFive } from "../../../models/appareil_levage/famille5_lev5/photo.mjs";
import { CompletedFamilleFiveLevFive } from "../../../models/appareil_levage/famille5_lev5/completed.mjs";
import { Observateur } from "../../../models/observateur.mjs";
import PhotoController from "../../../controllers/appareil_levage/famille5_lev5/PhotoController.mjs"
const router = Router();
import multer from 'multer'
import path from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pathFilesUploads = path.resolve(__dirname, `../../../uploads`);

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, pathFilesUploads)
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '.jpg') //Appending .jpg
    }
})
  
var upload = multer({ storage: storage });

router.post("/create", upload.single('file'), async (request, response) => {

    try {
        
        const observateurId = String(request.body.observateurId);
        let mimetype = request.file.mimetype.substring(6);

        const photo = new PhotoFamilleFiveLevFive({
            filename: request.file.filename,
            mimetype : mimetype,
            observateurId : request.body.observateurId
        });

       await photo.save()
       .then(async() => {

            await CompletedFamilleFiveLevFive.updateOne({ observateurId: observateurId }, {
                $set: {
                    photo: true,
                }
            })
            .then(() => {
                response.status(200).json({ message: "Done upload!", filename : request.file.filename });
            })
            .catch((error) => {
                console.log(error)
                response.status(400).json(error);
            });

       })
       .catch((error) => {
            response.status(400).json(error);
       });


    } catch (error) {
        console.log(error)
        response.status(400).json(error);
    }

});



router.get("/:observateurId", PhotoController.select);
router.delete("/:observateurId", PhotoController.reset);
router.get("/display/:filename", PhotoController.display);


export default router;