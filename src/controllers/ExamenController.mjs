
import { Examen } from "../models/examen.mjs";
import { query, body, validationResult, matchedData, checkSchema } from "express-validator"



const create = async (request, response) => {

    try {

        const { a, b, c, d, e, f, g, h, i, j, k, observateurId } = request.body;

        await Examen({ a, b, c, d, e, f, g, h, i, j, k, observateurId })
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

const select = async (request, response) => {

    try {

        const observateurId = String(request.params.observateurId);
        const examen = await Examen.findOne({ observateurId : observateurId });
        response.status(200).json(examen);


    } catch (error) {
        console.log(error)
        response.status(400).json(error);
    }

}

export default { create, select }