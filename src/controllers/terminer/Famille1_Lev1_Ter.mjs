import { Observateur } from "../../models/observateur.mjs";
import Reserve from '../../models/reserves.mjs';
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

                    await Reserve({
                        name: name,
                        status: "",
                        etat: "not_saved",
                    })
                        .save()
                        .then(() => {
                            response.status(201).json({ msg: true });
                        })
                        .catch((error) => {
                            console.log(error)
                            response.status(400).json(error);
                        });

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
