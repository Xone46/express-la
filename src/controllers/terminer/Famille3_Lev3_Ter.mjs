import { Observateur } from "../../models/observateur.mjs";
import { Commentaire } from "../../models/commentaire.mjs";
import { CompletedFamilleTreeLevTree } from "../../models/appareil_levage/famille3_lev3/completed.mjs";
import { Reserve } from '../../models/reserves.mjs';


const terminer = async (observateurId, response) => {

    const completed = await CompletedFamilleTreeLevTree.findOne({ observateurId: observateurId });
    const tab = new Array(completed.renseignement, completed.description, completed.examen, completed.conclusion, completed.photo);
    let checker = arr => arr.every(v => v === true);
    if (checker(tab) == false) {
        response.status(400).json({ msg: "Le contrôle n'est pas entièrement terminé. Veuillez examiner toutes les entrées." });
    } else {
        try {
            await Observateur.updateOne({ _id: observateurId }, { $set: { etat: true } })
                .then(async() => {

                    const userArray = [];
                    const commentaires = await Commentaire.find({ observateurId: observateurId });

                    if(commentaires) {

                        for (let i = 0; i < commentaires.length; i++) {
                            for (let j = 0; j < commentaires[i].modelSelected.length; j++) {
                                userArray.push({
                                    name: commentaires[i].modelSelected[j].name,
                                    status: "non critique",
                                    etat: "not_saved"
                                });
                            }
                        }

                        const reserve = Reserve.insertMany(userArray)

                        if(reserve) {
                            response.status(201).json({ msg: true });

                        } else {
                            response.status(201).json({ msg: true });
                        }


                    } else {
                        response.status(201).json({ msg: true });
                    }


                })
                .catch((error) => {
                    response.status(400).json(error);
                });

        } catch (error) {
            console.log(error)
            response.status(400).json(error);
        }
    }

}

export default { terminer }
