
import { Intervention } from "../models/intervention.mjs";
import { Observateur } from "../models/observateur.mjs";
import { query, body, validationResult, matchedData, checkSchema } from "express-validator"

const create = async(request, response) => {

    try {

        const result = validationResult(request);

        if (!result.isEmpty()) {
            const errors = result.errors.map((error) => { return error.msg; })
            return response.status(400).send({ errors: errors });
        }

        const data = matchedData(request);

        await Intervention(data)
        .save()
        .then(() => {
            response.status(201).json({ msg : "Enregistré avec succès" });
        })
        .catch((error) => {
            response.status(400).json(error);
        });

    } catch (error) {
        response.status(400).json(error);
    }

}

const read = async (request, response) => {
    try {
        const interventions = await Intervention.find().sort({date:-1});

        if(interventions.length === 0) {
            return response.status(404).json({ msg : "Il n'y a aucune Intervention" });
        } else {
            return response.status(200).json(interventions);
        }

    } catch(error) {
        response.status(400).json(error)
    }
}

const update = async(request, response) => {
    
}

const deleteOne = async(request, response) => {
    try {
        const result = await Intervention.deleteOne({ _id : request.params.interventionId });
        if(result.acknowledged == true && result.deletedCount == 1) {
            await Observateur.deleteMany({ interventionId : request.params.interventionId });
            response.status(200).json(true);
        }

    } catch (error) {
        console.log(error)
        response.status(400).json(error);
    }
}

export default { create, read, update, deleteOne }