import { Photo } from "../models/photo.mjs";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const select = async (request, response) => {

    try {

        const observateurId = String(request.params.observateurId);
        const photo = await Photo.findOne({ observateurId : observateurId });

        if(photo) {
            const urlImage = path.resolve(__dirname, `../uploads/${photo.filename}`);
            if (fs.existsSync(urlImage)) {
                   response.status(200).json({ img : photo.filename });
            }
        }


    } catch (error) {
        console.log(error)
        response.status(400).json(error);
    }

}

const display = async (request, response) => {

    try {

        var tempFilePath = path.join(__dirname, `../uploads/${request.params.filename}`);
        response.download(tempFilePath, function(err) {
              if (err) {
                throw err;
              }
        });

    } catch (error) {
        console.log(error)
        response.status(400).json(error);
    }

}

export default { select, display }