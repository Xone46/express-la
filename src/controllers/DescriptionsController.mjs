import { Description } from "../models/description.mjs";
import { query, body, validationResult, matchedData, checkSchema } from "express-validator"

const create = async (request, response) => {

    try {
        const {
            body : {
                marquage,
                modeDeLevage,
                caracteristiques,
                levageAuxiliaire,
                modeInstallation,
                modeInstallationDetails,
                modeInstallationDetailsAutre,
                sourceDenergie,
                observateurId
            }
        } = request;
        
        console.log(caracteristiques)

        await Description({
                marquage : marquage,
                modeDeLevage : modeDeLevage,
                caracteristiques : caracteristiques,
                levageAuxiliaire : levageAuxiliaire,
                levageAuxiliaire : levageAuxiliaire,
                modeInstallation : modeInstallation,
                modeInstallationDetails : modeInstallationDetails,
                modeInstallationDetailsAutre : modeInstallationDetailsAutre,
                sourceDenergie : sourceDenergie,
                observateurId : observateurId
            })
            .save()
            .then(async() => {
                response.status(201).json({ msg: "Enregistré avec succès" });
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
        const description = await Description.findOne({ observateurId : observateurId });
        response.status(200).json(description);


    } catch (error) {
        console.log(error)
        response.status(400).json(error);
    }

}


const reset = async (request, response) => {

    try {
        const observateurId = String(request.params.observateurId);
        await Description.deleteOne({ observateurId: observateurId })
            .then(async () => {
                response.status(201).json({ msg: "Deleted Done!" });
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

export default { create, select, reset }