
import { Completed } from "../models/completed.mjs";

const read = async (request, response) => {

    try {
        const completedCount = await Completed.find({ renseignement : true, description : true, examen : true, conclusion : true, photo : true}).count();
        response.status(200).json(completedCount);
    } catch(error) {
        response.status(400).json(error)
    }
}

export default { read }