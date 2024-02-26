
import { Renseignement } from "../models/renseignement.mjs";
import { query, body, validationResult, matchedData, checkSchema } from "express-validator"



const create = async (request, response) => {

    try {

        const result = validationResult(request);

        if (!result.isEmpty()) {
            const errors = result.errors.map((error) => { return error.msg; })
            return response.status(400).send({ errors: errors });
        }

        const data = matchedData(request);

        await Renseignement(data)
            .save()
            .then(async () => {
                response.status(201).json({ msg: "Enregistré avec succès" });
            })
            .catch((error) => {
                response.status(400).json(error);
            });

    } catch (error) {
        console.log(error)
        response.status(400).json(error);
    }

}


export default { create }