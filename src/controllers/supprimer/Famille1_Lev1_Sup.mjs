import { Observateur } from "../../models/observateur.mjs";
import { RenseignementFamilleOneLevOne } from "../../models/appareil_levage/famille1_lev1/renseignement.mjs";
import { DescriptionFamilleOneLevOne } from "../../models/appareil_levage/famille1_lev1/description.mjs";
import { ExamenFamilleOneLevOne } from "../../models/appareil_levage/famille1_lev1/examen.mjs";
import { ConclusionFamilleOneLevOne } from "../../models/appareil_levage/famille1_lev1/conclusion.mjs";
import { CommentaireFamilleOneLevOne } from "../../models/appareil_levage/famille1_lev1/commentaire.mjs";
import { PhotoFamilleOneLevOne } from "../../models/appareil_levage/famille1_lev1/photo.mjs";
import { CompletedFamilleOneLevOne } from "../../models/appareil_levage/famille1_lev1/completed.mjs";


import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supprimer = async (observateurId, response) => {

    const result = await Observateur.deleteOne({ _id: observateurId });
    if (result.acknowledged == true && result.deletedCount == 1) {
        await RenseignementFamilleOneLevOne.deleteOne({ observateurId: observateurId });
        await DescriptionFamilleOneLevOne.deleteOne({ observateurId: observateurId });
        await ExamenFamilleOneLevOne.deleteOne({ observateurId: observateurId });
        await ConclusionFamilleOneLevOne.deleteOne({ observateurId: observateurId });
        await CommentaireFamilleOneLevOne.deleteOne({ observateurId: observateurId });
        await CompletedFamilleOneLevOne.deleteOne({ observateurId: observateurId });
        const photo = await PhotoFamilleOneLevOne.findOne({ observateurId: observateurId })
        if (photo) {
            await PhotoFamilleOneLevOne.deleteOne({ observateurId: observateurId })
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

    await RenseignementFamilleOneLevOne.deleteOne({ observateurId: observateurId });
    await DescriptionFamilleOneLevOne.deleteOne({ observateurId: observateurId });
    await ExamenFamilleOneLevOne.deleteOne({ observateurId: observateurId });
    await ConclusionFamilleOneLevOne.deleteOne({ observateurId: observateurId });
    await CommentaireFamilleOneLevOne.deleteOne({ observateurId: observateurId });
    await CompletedFamilleOneLevOne.deleteOne({ observateurId: observateurId });
    await PhotoFamilleOneLevOne.deleteOne({ observateurId: observateurId });

}

export default { supprimer, supprimer_by_intervention }
