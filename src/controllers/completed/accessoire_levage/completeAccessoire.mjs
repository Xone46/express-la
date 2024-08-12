import { Completed } from "../../../models/accessoire_levage/famille_ac1/completed.mjs";

const save = async (request, response, id) => {

    await Completed({
        observateurId: id,
        renseignement: false,
        accessoire: false,
        fiche: false,
        photo: false
    }).save()
        .then(() => {
            response.status(201).json({ msg: "Enregistré avec succès" });
        })
        .catch((error) => {
            console.log(error)
            response.status(400).json(error);
        });
}

export default { save }