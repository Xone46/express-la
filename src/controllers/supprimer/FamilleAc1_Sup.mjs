import { Observateur } from "../../models/observateur.mjs";
import { Renseignement } from "../../models/accessoire_levage/famille_ac1/renseignement.mjs";
import { Accessoire } from "../../models/accessoire_levage/famille_ac1/accessoire.mjs";
import { Fiche } from "../../models/accessoire_levage/famille_ac1/fiche.mjs";
import { Photo } from "../../models/accessoire_levage/famille_ac1/photo.mjs";
import { Completed } from "../../models/accessoire_levage/famille_ac1/completed.mjs";


import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supprimer = async (observateurId, response) => {

    const result = await Observateur.deleteOne({ _id: observateurId });
    if (result.acknowledged == true && result.deletedCount == 1) {
        await Renseignement.deleteOne({ observateurId: observateurId });
        await Accessoire.deleteOne({ observateurId: observateurId });
        await Fiche.deleteOne({ observateurId: observateurId });
        await Completed.deleteOne({ observateurId: observateurId });
        const photo = await Photo.findOne({ observateurId: observateurId })
        if (photo) {
            await Photo.deleteOne({ observateurId: observateurId })
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

    await Renseignement.deleteOne({ observateurId: observateurId });
    await Description.deleteOne({ observateurId: observateurId });
    await Examen.deleteOne({ observateurId: observateurId });
    await Conclusion.deleteOne({ observateurId: observateurId });
    await Commentaire.deleteOne({ observateurId: observateurId });
    await Completed.deleteOne({ observateurId: observateurId });
    await Photo.deleteOne({ observateurId: observateurId });

}

export default { supprimer, supprimer_by_intervention }
