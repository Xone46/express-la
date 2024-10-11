import { Completed } from "../../../models/accessoire_levage/famille_ac1/completed.mjs";

const save = async (request, response, id) => {

    if (request.body.typeAppareil[0] == "Famille 1 LEV1") {
        
        await Completed({
            observateurId: id,
            renseignement: false,
            description: false,
            examen: false,
            conclusion: false,
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

}

export default { save }


