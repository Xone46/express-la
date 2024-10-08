import { Photo } from "../../../models/appareil_levage/famille4_lev4/photo.mjs";
import { Completed } from "../../../models/appareil_levage/famille4_lev4/completed.mjs";
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
            const urlImage = path.resolve(__dirname, `../../../uploads/${photo.filename}`);
            if (fs.existsSync(urlImage)) {
                   response.status(200).json({ img : photo.filename });
            } 

        } else {
            response.status(200).json({ img : null });
        }


    } catch (error) {
        console.log(error)
        response.status(400).json(error);
    }

}

const reset = async (request, response) => {

    try {

        const observateurId = String(request.params.observateurId);
        const photo = await Photo.findOne({ observateurId : observateurId });
        const deleted = await Photo.deleteOne({ observateurId : observateurId });
        
        if(deleted) {
            const urlImage = path.resolve(__dirname, `../../../uploads/${photo.filename}`);
            fs.unlink(urlImage, async(err) => {
                if (err) throw err;
                    await Completed.updateOne({ observateurId: observateurId }, {
                        $set: {
                            photo: false,
                        }
                    })
                    .then(() => {
                        response.status(200).json({ msg : "Deleted Done!"});
                    })
                    .catch((error) => {
                        console.log(error)
                        response.status(400).json(error);
                    });
              });
        }


    } catch (error) {
        console.log(error)
        response.status(400).json(error);
    }

}

const display = async (request, response) => {

    try {

        var tempFilePath = path.join(__dirname, `../../../uploads/${request.params.filename}`);
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

export default { select, display, reset }