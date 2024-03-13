
import { Conclusion } from "../models/conclusion.mjs";
import { query, body, validationResult, matchedData, checkSchema } from "express-validator"



const create = async (request, response) => {

    try {

        const { a, b, c, d, e, f, g, poids, commentaire, observateurId } = request.body;

        await Conclusion({ a, b, c, d, e, f, g, poids, commentaire, observateurId })
            .save()
            .then(async () => {
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

const update = async (request, response) => {

    try {

        const conclusion = await Conclusion.findOne({ observateurId : request.body.observateurId });

        if(conclusion) {

            const { a, b, c, d, e, f, g, poids, commentaire, observateurId } = request.body;

            await Conclusion.updateOne({ observateurId : observateurId }, { $set : { a : a, b : b, c : c, d : d, e : e, f : f, g : g, poids : poids, commentaire : commentaire }})
            .then(async () => {
                response.status(201).json({ msg: "Modifié avec succès" });
            })
            .catch((error) => {
                response.status(400).json(error);
                console.log(error)
            });
        }


    } catch (error) {
        console.log(error)
        response.status(400).json(error);
    }

}


const select = async (request, response) => {

    try {

        const observateurId = String(request.params.observateurId);
        const conclusion = await Conclusion.findOne({ observateurId : observateurId });
        response.status(200).json(conclusion);


    } catch (error) {
        console.log(error)
        response.status(400).json(error);
    }

}

export default { create , select, update }