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
                sourceDenergie
            }
        } = request;

        await Description({
                marquage : marquage,
                modeDeLevage : modeDeLevage,
                caracteristiques : caracteristiques,
                levageAuxiliaire : levageAuxiliaire,
                levageAuxiliaire : levageAuxiliaire,
                modeInstallation : modeInstallation,
                modeInstallationDetails : modeInstallationDetails,
                modeInstallationDetailsAutre : modeInstallationDetailsAutre,
                sourceDenergie : sourceDenergie
            })
            .save()
            .then(async(result) => {
                response.status(201).json({ msg: "Enregistré avec succès" });
            })
            .catch((error) => {
                response.status(400).json(error);
            });

    } catch (error) {
        response.status(400).json(error);
    }

}


export default { create }