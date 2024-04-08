
import { Completed } from "../models/completed.mjs";

const read = async (request, response) => {

    try {
        const completedCount = await Completed.find({ renseignement : true, description : true, examen : true, conclusion : true, photo : true}).count();
        response.status(200).json(completedCount);
    } catch(error) {
        response.status(400).json(error)
    }
}

const checkRenseignement = async (request, response) => {
    const observateurId = String(request.params.observateurId);
    try {
        const completed = await Completed.find({ observateurId : observateurId, renseignement : true });
        if(completed.length != 0) {
            response.status(200).json(true);
        } else {
            response.status(200).json(false);
        }
    } catch(error) {
        response.status(400).json(error)
    }
}

export default { read, checkRenseignement }