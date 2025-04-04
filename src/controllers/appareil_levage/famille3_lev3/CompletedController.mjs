
import { CompletedFamilleTreeLevTree } from "../../../models/appareil_levage/famille3_lev3/completed.mjs";
import { Observateur } from "../../../models/observateur.mjs";
import { RenseignementFamilleTreeLevTree } from "../../../models/appareil_levage/famille3_lev3/renseignement.mjs";

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
        const completed = await CompletedFamilleTreeLevTree.find({ observateurId: observateurId, renseignement: true });
        if (completed.length == 0) {
            response.status(200).json(false);
        } else {
            response.status(200).json(true);
        }

    } catch (error) {
        response.status(400).json(error);
    }
}



const checkExamen = async (request, response) => {
    const observateurId = String(request.params.observateurId);
    try {
        const completed = await CompletedFamilleTreeLevTree.find({ observateurId: observateurId, examen: true });
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

const checkDescription = async (request, response) => {
    const observateurId = String(request.params.observateurId);
    try {
        const completed = await CompletedFamilleTreeLevTree.find({ observateurId: observateurId, description: true });
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

const checkConclusion = async (request, response) => {
    const observateurId = String(request.params.observateurId);
    try {
        const completed = await CompletedFamilleTreeLevTree.find({ observateurId: observateurId, conclusion: true });
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

        const completed = await CompletedFamilleTreeLevTree.find({ observateurId: observateurId, photo: true });

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


const checkAll = async (request, response) => {
    const observateurId = String(request.params.observateurId);
    try {

        const completed = await CompletedFamilleTreeLevTree.find({ observateurId: observateurId, renseignement: true , description : true, examen : true, conclusion : true, photo: true });
        const res = await CompletedFamilleTreeLevTree.find({ observateurId: observateurId });
        
        if (completed.length == 0) {
            response.status(200).json({ status : false, completed : res });
        } else {
            response.status(200).json({ status : true, completed : completed });
        }
    } catch (error) {
        response.status(400).json(error)
    }
} 

export default { read, checkRenseignement, checkDescription, checkExamen, checkConclusion, checkPhoto, checkAll }