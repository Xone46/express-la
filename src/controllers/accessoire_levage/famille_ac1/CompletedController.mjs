import { Completed } from "../../../models/accessoire_levage/famille_ac1/completed.mjs";
import { Renseignement } from "../../../models/accessoire_levage/famille_ac1/renseignement.mjs";
import { Observateur } from "../../../models/observateur.mjs";


const read = async (request, response) => {
    try {
        const completedCount = await Observateur.find({ etat : true }).count();
        response.status(200).json(completedCount);
    } catch (error) {
        response.status(400).json(error)
    }
}



const checkRenseignement = async (request, response) => {
    const observateurId = String(request.params.observateurId);

    try {
        const renseignement = await Renseignement.find({ observateurId: observateurId, renseignement : true });
        console.log(renseignement)
        if (renseignement.length == 0) {
            response.status(200).json(false);
        } else {
            response.status(200).json(true);
        }

    } catch (error) {
        response.status(400).json(error);
    }
}



const checkAccessoire = async (request, response) => {
    const observateurId = String(request.params.observateurId);
    try {
        const completed = await Completed.find({ observateurId: observateurId, accessoire: true });
        if (completed.length != 0) {
            response.status(200).json(true);
        } else {
            response.status(200).json(false);
        }
        next();

    } catch (error) {
        response.status(400).json(error)
    }
}

const checkFiche = async (request, response) => {
    const observateurId = String(request.params.observateurId);
    try {
        const completed = await Completed.find({ observateurId: observateurId, fiche: true });
        if (completed.length != 0) {
            response.status(200).json(true);
        } else {
            response.status(200).json(false);
        }
        next();

    } catch (error) {
        response.status(400).json(error)
    }
}



const checkPhoto = async (request, response) => {
    const observateurId = String(request.params.observateurId);
    try {

        const completed = await Completed.find({ observateurId: observateurId, photo: true });

        if (completed.length != 0) {
            response.status(200).json(true);
        } else {
            response.status(200).json(false);
        }

        next();
    } catch (error) {
        response.status(400).json(error)
    }
}

export default { read, checkRenseignement, checkAccessoire, checkFiche, checkPhoto }