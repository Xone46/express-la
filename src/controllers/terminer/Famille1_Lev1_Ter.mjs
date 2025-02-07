import { Observateur } from "../../models/observateur.mjs";
import { Commentaire } from "../../models/commentaire.mjs";
import { createReserveModel } from '../../models/reserves.mjs';
import { CompletedFamilleOneLevOne } from "../../models/appareil_levage/famille1_lev1/completed.mjs";


const terminer = async (observateurId, response) => {

    const completed = await CompletedFamilleOneLevOne.findOne({ observateurId: observateurId });
    const tab = new Array(completed.renseignement, completed.description, completed.examen, completed.conclusion, completed.photo);
    let checker = arr => arr.every(v => v === true);
    if (checker(tab) == false) {
        response.status(400).json({ msg: "Le contrôle n'est pas entièrement terminé. Veuillez examiner toutes les entrées." });
    } else {
        try {
            await Observateur.updateOne({ _id: observateurId }, { $set: { etat: true } })
                .then(async () => {

                    const userArray = [];
                    const commentaires = await Commentaire.find({ observateurId: observateurId });

                    if (commentaires) {

                        for (let i = 0; i < commentaires.length; i++) {
                            for (let j = 0; j < commentaires[i].modelSelected.length; j++) {
                                userArray.push({
                                    name: commentaires[i].modelSelected[j].name,
                                    status: "non critique",
                                    etat: "not_saved"
                                });
                            }
                        }

                        const Reserve = await createReserveModel();  
                        const reserve = Reserve.insertMany(userArray)
                        console.log(reserve)

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
