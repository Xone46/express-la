import { DescriptionFamilleTowLevTow } from "../../../models/appareil_levage/famille2_lev2/description.mjs";
import { CompletedFamilleTowLevTow } from "../../../models/appareil_levage/famille2_lev2/completed.mjs";
import { query, body, validationResult, matchedData, checkSchema } from "express-validator"
import { checkEmpty } from "../../../middelwares/description/checkEmpty.mjs";

const create = async (request, response) => {

    try {
        const {
            body : {
                marquage,
                modeLevage,
                chargeMaximaleUtile,
                hauteurDeLevage,
                course,
                hauteurLevage,
                portee,
                porteFaux,
                longueurCheminRoulement,
                suspentesLevage,
                mouflage,
                diametre,
                levageAuxilaire,
                // mouflageLevageAuxilaire,
                diametreLevageAuxilaire,
                modeInstallation,
                complementModeInstallation,
                flagComplementModeInstallation,
                sourceEnergie,
                flagcomplementSourceEnergie,
                complementSourceEnergie,
                observateurId
            }
        } = request;

        // get renseignement
        const description = await DescriptionFamilleTowLevTow.findOne({ observateurId: request.body.observateurId });

        if (description) {
            await DescriptionFamilleTowLevTow.updateOne({ observateurId: request.body.observateurId }, { $set: {                 
                marquage :marquage,
                modeLevage : modeLevage,
                chargeMaximaleUtile : chargeMaximaleUtile,
                hauteurDeLevage : hauteurDeLevage,
                course : course,
                hauteurLevage : hauteurLevage,
                portee : portee,
                porteFaux : porteFaux,
                longueurCheminRoulement : longueurCheminRoulement,
                suspentesLevage : suspentesLevage,
                mouflage : mouflage,
                diametre : diametre,
                levageAuxilaire : levageAuxilaire,
                // mouflageLevageAuxilaire : mouflageLevageAuxilaire,
                diametreLevageAuxilaire : diametreLevageAuxilaire,
                modeInstallation : modeInstallation,
                complementModeInstallation : complementModeInstallation,
                flagComplementModeInstallation : flagComplementModeInstallation,
                sourceEnergie : sourceEnergie,
                flagcomplementSourceEnergie : flagcomplementSourceEnergie,
                complementSourceEnergie : complementSourceEnergie,
                observateurId : observateurId
            } })
            .then((result) => {
                response.status(201).json({ msg: "Modifié avec succès", descriptionId : result._id });
            })
            .catch((error) => {
                console.log(error)
                response.status(400).json(error);
            });

        } else {
            
            await DescriptionFamilleTowLevTow({
                marquage :marquage,
                modeLevage : modeLevage,
                chargeMaximaleUtile : chargeMaximaleUtile,
                hauteurDeLevage : hauteurDeLevage,
                course : course,
                hauteurLevage : hauteurLevage,
                portee : portee,
                porteFaux : porteFaux,
                longueurCheminRoulement : longueurCheminRoulement,
                suspentesLevage : suspentesLevage,
                mouflage : mouflage,
                diametre : diametre,
                levageAuxilaire : levageAuxilaire,
                // mouflageLevageAuxilaire : mouflageLevageAuxilaire,
                diametreLevageAuxilaire : diametreLevageAuxilaire,
                modeInstallation : modeInstallation,
                complementModeInstallation : complementModeInstallation,
                flagComplementModeInstallation : flagComplementModeInstallation,
                sourceEnergie : sourceEnergie,
                flagcomplementSourceEnergie : flagcomplementSourceEnergie,
                complementSourceEnergie : complementSourceEnergie,
                observateurId : observateurId
                })
                .save()
                .then(async(result) => {
    
                    await CompletedFamilleTowLevTow.updateOne({ observateurId: observateurId }, {
                        $set: {
                            description: true,
                        }
                    })
                    .then((result) => {
                        response.status(201).json({ msg: "Enregistré avec succès", renseignementId: result._id });
                    })
                    .catch((error) => {
                        console.log(error)
                        response.status(400).json(error);
                    });
    
                })
                .catch((error) => {
                    console.log(error)
                    response.status(400).json(error);
                });
        }

    

    } catch (error) {
        console.log(error.message);
        response.status(400).json(error);
    }

}


const select = async (request, response) => {

    try {

        const observateurId = String(request.params.observateurId);
        const description = await DescriptionFamilleTowLevTow.findOne({ observateurId : observateurId });
        if(description) {
            response.status(200).json({ description : description });
        } 

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
                    await CompletedFamilleTowLevTow.updateOne({ observateurId: observateurId }, {
                        $set: {
                            description: false,
                        }
                    })
                    .then(() => {
                        response.status(201).json({ msg: "Deleted Done!" });
                    })
                    .catch((error) => {
                        console.log(error)
                        response.status(400).json(error);
                    });
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