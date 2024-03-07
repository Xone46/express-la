
import { Renseignement } from "../models/renseignement.mjs";
import { query, body, validationResult, matchedData, checkSchema } from "express-validator"



const create = async (request, response) => {


    try {

        await Renseignement(request.body)
            .save()
            .then(async (result) => {
                response.status(201).json({ msg: "Enregistré avec succès" , renseignementId : result._id });
            })
            .catch((error) => {
                console.log(error)
                response.status(400).json(error);
            });

    } catch (error) {
        console.log(error)
        response.status(400).json(error);
    }

}

const select = async (request, response) => {

    try {

        const observateurId = String(request.params.observateurId);
        
        const observateur = await Renseignement.findOne({ observateurId : observateurId });
        console.log(observateur)
        response.status(200).json(observateur);


    } catch (error) {
        console.log(error)
        response.status(400).json(error);
    }

}


export default { create, select }