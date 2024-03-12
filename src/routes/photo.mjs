import { Router } from "express";
import { Photo } from "../models/photo.mjs";
import PhotoController from "../controllers/PhotoController.mjs"
const router = Router();
import multer from 'multer'
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import { error } from "console";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pathFilesUploads = path.resolve(__dirname, `../uploads`);

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
        
        let mimetype = request.file.mimetype.substring(6);

        const photo = new Photo({
            filename: request.file.filename,
            mimetype : mimetype,
            observateurId : request.body.observateurId
        });

        const result = await photo.save();

        if (result) {
            return response.status(201).json({ message: "Done upload!", filename : request.file.filename });
        }

    } catch (error) {
        console.log(error)
        response.status(400).json(error);
    }

});

router.post("/update", upload.single('file'), async (request, response) => {

    try {
        const photo = await Photo.findOne({ observateurId : request.body.observateurId });
        if(photo) {
            const pathFileDelete = path.resolve(__dirname, `../uploads/${photo.filename}`);
            fs.unlink(pathFileDelete, async (err) => {
                if (err) {
                  console.error(err);
                } else {
                  let mimetype = request.file.mimetype.substring(6);
                  await Photo.updateOne({ observateurId : request.body.observateurId }, { $set : { filename: request.file.filename, mimetype : mimetype }})
                  .then(() => {
                    return response.status(201).json({ message: "Done Modfied!", filename : request.file.filename });
                  })
                  .catch((error) => {
                    console.log(error);
                  });
                }
              });
        }
        

    } catch (error) {
        console.log(error)
        response.status(400).json(error);
    }

});

router.get("/:observateurId", PhotoController.select);
router.get("/display/:filename", PhotoController.display);


export default router;