import { Observateur } from "../../models/observateur.mjs";
import { Completed } from "../../models/accessoire_levage/famille_ac1/completed.mjs";
import { Commentaire } from "../../models/commentaire.mjs";

const terminer = async (observateurId, response) => {

    const completed = await Completed.findOne({ observateurId: observateurId });
    const tab = new Array(completed.renseignement, completed.accessoire, completed.fiche, completed.photo);

    let checker = arr => arr.every(v => v === true);

    if (checker(tab) == false) {
        response.status(200).json({ msg: false });
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

                        await Reserve.insertMany(userArray)
                            .save()
                            .thne((result) => {
                                console.log(result)
                                response.status(201).json({ msg: true });
                            })
                            .catch((error) => {
                                console.log(error)
                            })
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
