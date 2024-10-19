import { Observateur } from "../../models/observateur.mjs";
import { RenseignementFamilleFiveLevFive } from "../../models/appareil_levage/famille5_lev5/renseignement.mjs";
import { DescriptionFamilleFiveLevFive } from "../../models/appareil_levage/famille5_lev5/description.mjs";
import { ExamenFamilleFiveLevFive } from "../../models/appareil_levage/famille5_lev5/examen.mjs";
import { ConclusionFamilleFiveLevFive } from "../../models/appareil_levage/famille5_lev5/conclusion.mjs";
import { Commentaire } from "../../models/commentaire.mjs";
import { PhotoFamilleFiveLevFive } from "../../models/appareil_levage/famille5_lev5/photo.mjs";
import { CompletedFamilleFiveLevFive } from "../../models/appareil_levage/famille5_lev5/completed.mjs";


import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supprimer = async (observateurId, response) => {

    const result = await Observateur.deleteOne({ _id: observateurId });
    if (result.acknowledged == true && result.deletedCount == 1) {
        await RenseignementFamilleFiveLevFive.deleteOne({ observateurId: observateurId });
        await DescriptionFamilleFiveLevFive.deleteOne({ observateurId: observateurId });
        await ExamenFamilleFiveLevFive.deleteOne({ observateurId: observateurId });
        await ConclusionFamilleFiveLevFive.deleteOne({ observateurId: observateurId });
        await Commentaire.deleteOne({ observateurId: observateurId });
        await CompletedFamilleFiveLevFive.deleteOne({ observateurId: observateurId });
        const photo = await PhotoFamilleFiveLevFive.findOne({ observateurId: observateurId })
        if (photo) {
            await PhotoFamilleFiveLevFive.deleteOne({ observateurId: observateurId })
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

    await RenseignementFamilleFiveLevFive.deleteOne({ observateurId: observateurId });
    await DescriptionFamilleFiveLevFive.deleteOne({ observateurId: observateurId });
    await ExamenFamilleFiveLevFive.deleteOne({ observateurId: observateurId });
    await ConclusionFamilleFiveLevFive.deleteOne({ observateurId: observateurId });
    await Commentaire.deleteOne({ observateurId: observateurId });
    await CompletedFamilleFiveLevFive.deleteOne({ observateurId: observateurId });
    await PhotoFamilleFiveLevFive.deleteOne({ observateurId: observateurId });

}

export default { supprimer, supprimer_by_intervention }
