import { Observateur } from "../../models/observateur.mjs";
import { RenseignementFamilleTreeLevTree } from "../../models/appareil_levage/famille3_lev3/renseignement.mjs";
import { DescriptionFamilleTreeLevTree } from "../../models/appareil_levage/famille3_lev3/description.mjs";
import { ExamenFamilleTreeLevTree } from "../../models/appareil_levage/famille3_lev3/examen.mjs";
import { ConclusionFamilleTreeLevTree } from "../../models/appareil_levage/famille3_lev3/conclusion.mjs";
import { CommentaireFamilleTreeLevTree } from "../../models/appareil_levage/famille3_lev3/commentaire.mjs";
import { PhotoFamilleTreeLevTree } from "../../models/appareil_levage/famille3_lev3/photo.mjs";
import { CompletedFamilleTreeLevTree } from "../../models/appareil_levage/famille3_lev3/completed.mjs";


import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supprimer = async (observateurId, response) => {

    const result = await Observateur.deleteOne({ _id: observateurId });
    if (result.acknowledged == true && result.deletedCount == 1) {
        await RenseignementFamilleTreeLevTree.deleteOne({ observateurId: observateurId });
        await DescriptionFamilleTreeLevTree.deleteOne({ observateurId: observateurId });
        await ExamenFamilleTreeLevTree.deleteOne({ observateurId: observateurId });
        await ConclusionFamilleTreeLevTree.deleteOne({ observateurId: observateurId });
        await CommentaireFamilleTreeLevTree.deleteOne({ observateurId: observateurId });
        await CompletedFamilleTreeLevTree.deleteOne({ observateurId: observateurId });
        const photo = await PhotoFamilleTreeLevTree.findOne({ observateurId: observateurId })
        if (photo) {
            await PhotoFamilleTreeLevTree.deleteOne({ observateurId: observateurId })
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

    await RenseignementFamilleTreeLevTree.deleteOne({ observateurId: observateurId });
    await DescriptionFamilleTreeLevTree.deleteOne({ observateurId: observateurId });
    await ExamenFamilleTreeLevTree.deleteOne({ observateurId: observateurId });
    await ConclusionFamilleTreeLevTree.deleteOne({ observateurId: observateurId });
    await CommentaireFamilleTreeLevTree.deleteOne({ observateurId: observateurId });
    await CompletedFamilleTreeLevTree.deleteOne({ observateurId: observateurId });
    await PhotoFamilleTreeLevTree.deleteOne({ observateurId: observateurId });

}

export default { supprimer, supprimer_by_intervention }
