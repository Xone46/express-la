import { Router } from "express";
import { Photo } from "../models/photo.mjs";
import PhotoController from "../controllers/PhotoController.mjs"
const router = Router();
import multer from 'multer'

const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"]
    if (!allowedTypes.includes(file.mimetype)) {
        const err = new Error('Incorrect File');
        return cb(err, false)
    }
    cb(null, true)
}

const upload = multer({
    dest: './uploads',
    fileFilter,
})

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
            console.log(result)
            return response.status(201).json({ message: "Done upload!" });
        }

    } catch (error) {
        console.log(error)
        response.status(400).json(error);
    }

});

router.get("/:observateurId", PhotoController.select);



export default router;