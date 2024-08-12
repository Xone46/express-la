import { Completed } from "../../../models/appareil_levage/famille1_lev1/completed.mjs";

const save = async (request, response, id) => {

    await Completed({
        observateurId: id,
        renseignement : false, 
        description : false,
        examen : false,
        conclusion : false,
        photo : false
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