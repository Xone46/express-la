import { Observateur } from "../../models/observateur.mjs";
import { RenseignementFamilleFourLevFour } from "../../models/appareil_levage/famille4_lev4/renseignement.mjs";
import { DescriptionFamilleFourLevFour } from "../../models/appareil_levage/famille4_lev4/description.mjs";
import { ExamenFamilleFourLevFour } from "../../models/appareil_levage/famille4_lev4/examen.mjs";
import { ConclusionFamilleFourLevFour } from "../../models/appareil_levage/famille4_lev4/conclusion.mjs";
import { Commentaire } from "../../models/commentaire.mjs";
import { PhotoFamilleFourLevFour } from "../../models/appareil_levage/famille4_lev4/photo.mjs";
import { CompletedFamilleFourLevFour } from "../../models/appareil_levage/famille4_lev4/completed.mjs";


import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supprimer = async (observateurId, response) => {

    const result = await Observateur.deleteOne({ _id: observateurId });
    if (result.acknowledged == true && result.deletedCount == 1) {
        await RenseignementFamilleFourLevFour.deleteOne({ observateurId: observateurId });
        await DescriptionFamilleFourLevFour.deleteOne({ observateurId: observateurId });
        await ExamenFamilleFourLevFour.deleteOne({ observateurId: observateurId });
        await ConclusionFamilleFourLevFour.deleteOne({ observateurId: observateurId });
        await Commentaire.deleteOne({ observateurId: observateurId });
        await CompletedFamilleFourLevFour.deleteOne({ observateurId: observateurId });
        const photo = await PhotoFamilleFourLevFour.findOne({ observateurId: observateurId })
        if (photo) {
            await PhotoFamilleFourLevFour.deleteOne({ observateurId: observateurId })
                .then(() => {
                    const pathFile = path.resolve(__dirname, `../uploads/${photo.filename}`);
                    fs.unlink(pathFile, (err) => {
                        if (err) {
                            response.status(200).json({ msg: "Done Deleted!" })
                        } else {
                            response.status(200).json({ msg: "Done Deleted!" })
                        }
                    });
                })
                .catch((error) => {
                    response.status(400).json(error);
                });
        }


    } else {
        response.status(200).json({ msg: "Done Deleted!" })
    }

}

const supprimer_by_intervention = async (observateurId) => {

    await RenseignementFamilleFourLevFour.deleteOne({ observateurId: observateurId });
    await DescriptionFamilleFourLevFour.deleteOne({ observateurId: observateurId });
    await ExamenFamilleFourLevFour.deleteOne({ observateurId: observateurId });
    await ConclusionFamilleFourLevFour.deleteOne({ observateurId: observateurId });
    await Commentaire.deleteOne({ observateurId: observateurId });
    await CompletedFamilleFourLevFour.deleteOne({ observateurId: observateurId });
    await PhotoFamilleFourLevFour.deleteOne({ observateurId: observateurId });

}

export default { supprimer, supprimer_by_intervention }
