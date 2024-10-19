import { Observateur } from "../../models/observateur.mjs";
import { CompletedFamilleFiveLevFive } from "../../models/appareil_levage/famille5_lev5/completed.mjs";


const terminer = async (observateurId, response) => {

    const completed = await CompletedFamilleFiveLevFive.findOne({ observateurId: observateurId });
    const tab = new Array(completed.renseignement, completed.description, completed.examen, completed.conclusion, completed.photo);
    let checker = arr => arr.every(v => v === true);
    if (checker(tab) == false) {
        response.status(400).json({ msg: "Le contrôle n'est pas entièrement terminé. Veuillez examiner toutes les entrées." });
    } else {
        try {
            await Observateur.updateOne({ _id: observateurId }, { $set: { etat: true } })
                .then((result) => {
                    response.status(201).json({ msg: true });
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
