
import { Observateur } from "../models/observateur.mjs";
import { query, body, validationResult, matchedData, checkSchema } from "express-validator"
import mongoose from "mongoose";

const create = async(request, response) => {

    try {

        const result = validationResult(request);

        if (!result.isEmpty()) {
            const errors = result.errors.map((error) => { return error.msg; })
            return response.status(400).send({ errors: errors });
        }

        const data = matchedData(request);

        await Observateur(data)
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

const select = async (request, response) => {

    try {

        const observateurId = String(request.params.observateurId);

        const observateurs = await Observateur.findById(observateurId).sort({date:-1});
        console.log(observateurs)

        if(observateurs == null) {
            return response.status(404).json({ msg : "Il n'y a aucune Appareil(s), équipement(s) ou installation(s) " });
        } else {
            return response.status(200).json(observateurs);
        }

    } catch(error) {
        console.log(error)
        response.status(400).json(error);
    }
}

const read = async (request, response) => {
    try {
      return response.status(404).json({ msg : "Il n'y a aucune Appareil(s), équipement(s) ou installation(s) " });
    } catch(error) {
        response.status(400).json(error)
    }
}


const update = async(request, response) => {
    
}

const deleteOne = async(request, response) => {
    try {

        const result = await Observateur.deleteOne({ _id : request.params.bservateurId });
        if(result.acknowledged == true && result.deletedCount == 1) {
            response.status(200).json(true);
        }

    } catch (error) {
        console.log(error)
        response.status(400).json(error);
    }
}

export default { create, read, update, deleteOne, select }