
import { Conclusion } from "../models/conclusion.mjs";
import { query, body, validationResult, matchedData, checkSchema } from "express-validator"



const create = async (request, response) => {

    try {

        const { observationsComplémentairesTableSelected, poids, conclusionTableSelected, commentaire } = request.body;

        await Conclusion({ observationsComplémentairesTableSelected, poids, conclusionTableSelected, commentaire })
            .save()
            .then(async (result) => {
                console.log(result)
                response.status(201).json({ msg: "Enregistré avec succès" });
            })
            .catch((error) => {
                response.status(400).json(error);
                console.log(error)
            });

    } catch (error) {
        console.log(error)
        response.status(400).json(error);
    }

}


export default { create }