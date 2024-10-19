import { DescriptionFamilleFiveLevFive } from "../../../models/appareil_levage/famille5_lev5/description.mjs";
import { CompletedFamilleFiveLevFive } from "../../../models/appareil_levage/famille5_lev5/completed.mjs";
import { query, body, validationResult, matchedData, checkSchema } from "express-validator"
import { checkEmpty } from "../../../middelwares/description/checkEmpty.mjs";

const create = async (request, response) => {

    try {
        const {
            body : {
                marquage,
                chargeMaximaleUtile,
                porteeMinimale,
                distanceCentreGravite,
                course,
                hauteurLevage,
                portee,
                porteFauxDeport,
                longueurCheminRoulement,
                dimensionPlateau,
                modeInstallation,
                suiveModeInstallation,
                mecanisme,
                suiveMecanisme,
                suspentes,
                observateurId,
            }
        } = request;

        // get renseignement
        const description = await DescriptionFamilleFiveLevFive.findOne({ observateurId: request.body.observateurId });

        if (description) {
            await DescriptionFamilleFiveLevFive.updateOne({ observateurId: request.body.observateurId }, { $set: {                 
                marquage : marquage,
                chargeMaximaleUtile : chargeMaximaleUtile,
                porteeMinimale : porteeMinimale,
                distanceCentreGravite : distanceCentreGravite,
                course : course,
                hauteurLevage : hauteurLevage,
                portee : portee,
                porteFauxDeport : porteFauxDeport,
                longueurCheminRoulement : longueurCheminRoulement,
                dimensionPlateau : dimensionPlateau,
                modeInstallation : modeInstallation,
                suiveModeInstallation : suiveModeInstallation,
                mecanisme : mecanisme,
                suiveMecanisme : suiveMecanisme,
                suspentes : suspentes,
                observateurId : observateurId,
            } })
            .then((result) => {
                response.status(201).json({ msg: "Modifié avec succès", descriptionId : result._id });
            })
            .catch((error) => {
                console.log(error)
                response.status(400).json(error);
            });

        } else {
            
            await DescriptionFamilleFiveLevFive({
                marquage : marquage,
                chargeMaximaleUtile : chargeMaximaleUtile,
                porteeMinimale : porteeMinimale,
                distanceCentreGravite : distanceCentreGravite,
                course : course,
                hauteurLevage : hauteurLevage,
                portee : portee,
                porteFauxDeport : porteFauxDeport,
                longueurCheminRoulement : longueurCheminRoulement,
                dimensionPlateau : dimensionPlateau,
                modeInstallation : modeInstallation,
                suiveModeInstallation : suiveModeInstallation,
                mecanisme : mecanisme,
                suiveMecanisme : suiveMecanisme,
                suspentes : suspentes,
                observateurId : observateurId,
                })
                .save()
                .then(async(result) => {
    
                    await CompletedFamilleFiveLevFive.updateOne({ observateurId: observateurId }, {
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
        const description = await DescriptionFamilleFiveLevFive.findOne({ observateurId : observateurId });
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
                    await Completed.updateOne({ observateurId: observateurId }, {
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