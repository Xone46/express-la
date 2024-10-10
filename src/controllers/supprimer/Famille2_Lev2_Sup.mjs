import { Observateur } from "../../models/observateur.mjs";
import { RenseignementFamilleTowLevTow } from "../../models/appareil_levage/famille2_lev2/renseignement.mjs";
import { DescriptionFamilleTowLevTow } from "../../models/appareil_levage/famille2_lev2/description.mjs";
import { ExamenFamilleTowLevTow } from "../../models/appareil_levage/famille2_lev2/examen.mjs";
import { ConclusionFamilleTowLevTow } from "../../models/appareil_levage/famille2_lev2/conclusion.mjs";
import { Commentaire } from "../../models/commentaire.mjs";
import { PhotoFamilleTowLevTow } from "../../models/appareil_levage/famille2_lev2/photo.mjs";
import { CompletedFamilleTowLevTow } from "../../models/appareil_levage/famille2_lev2/completed.mjs";


import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supprimer = async (observateurId, response) => {

    const result = await Observateur.deleteOne({ _id: observateurId });
    if (result.acknowledged == true && result.deletedCount == 1) {
        await RenseignementFamilleTowLevTow.deleteOne({ observateurId: observateurId });
        await DescriptionFamilleTowLevTow.deleteOne({ observateurId: observateurId });
        await ExamenFamilleTowLevTow.deleteOne({ observateurId: observateurId });
        await ConclusionFamilleTowLevTow.deleteOne({ observateurId: observateurId });
        await Commentaire.deleteOne({ observateurId: observateurId });
        await CompletedFamilleTowLevTow.deleteOne({ observateurId: observateurId });
        const photo = await PhotoFamilleTowLevTow.findOne({ observateurId: observateurId })
        if (photo) {
            await PhotoFamilleTowLevTow.deleteOne({ observateurId: observateurId })
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

    await RenseignementFamilleTowLevTow.deleteOne({ observateurId: observateurId });
    await DescriptionFamilleTowLevTow.deleteOne({ observateurId: observateurId });
    await ExamenFamilleTowLevTow.deleteOne({ observateurId: observateurId });
    await ConclusionFamilleTowLevTow.deleteOne({ observateurId: observateurId });
    await Commentaire.deleteOne({ observateurId: observateurId });
    await CompletedFamilleTowLevTow.deleteOne({ observateurId: observateurId });
    await PhotoFamilleTowLevTow.deleteOne({ observateurId: observateurId });

}

export default { supprimer, supprimer_by_intervention }
