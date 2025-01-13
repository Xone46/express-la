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
                hauteurLeveeMaximale,
                levage,
                sourceEnergie,
                dispositifElevation,
                transmissionElevation,
                nombreChainesCables,
                chargeRupture,
                coefficientUtilisation,
                organesSuspension,
                supoprtCharge,
                levageAuxiliaire,
                observateurId
            }
        } = request;

        // get renseignement
        const description = await DescriptionFamilleFiveLevFive.findOne({ observateurId: request.body.observateurId });

        if (description) {
            await DescriptionFamilleFiveLevFive.updateOne({ observateurId: request.body.observateurId }, { $set: {                 
                marquage : marquage,
                chargeMaximaleUtile : chargeMaximaleUtile,
                hauteurLeveeMaximale : hauteurLeveeMaximale,
                levage : levage,
                sourceEnergie : sourceEnergie,
                dispositifElevation : dispositifElevation,
                transmissionElevation : transmissionElevation,
                nombreChainesCables : nombreChainesCables,
                chargeRupture : chargeRupture,
                coefficientUtilisation : coefficientUtilisation,
                organesSuspension : organesSuspension,
                supoprtCharge : supoprtCharge,
                levageAuxiliaire : levageAuxiliaire,
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
            
            await DescriptionFamilleFiveLevFive({
                marquage : marquage,
                chargeMaximaleUtile : chargeMaximaleUtile,
                hauteurLeveeMaximale : chargeMaximaleUtile,
                levage : levage,
                sourceEnergie : sourceEnergie,
                dispositifElevation : dispositifElevation,
                transmissionElevation : transmissionElevation,
                nombreChainesCables : nombreChainesCables,
                chargeRupture : chargeRupture,
                coefficientUtilisation : coefficientUtilisation,
                organesSuspension : organesSuspension,
                supoprtCharge : supoprtCharge,
                levageAuxiliaire : levageAuxiliaire,
                observateurId : observateurId
                })
                .save()
                .then(async() => {
    
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
        } else {
            response.status(200).json({ description : null });
        }

    } catch (error) {
        console.log(error)
        response.status(400).json(error);
    }

}


const reset = async (request, response) => {

    try {
        const observateurId = String(request.params.observateurId);
        await DescriptionFamilleFiveLevFive.deleteOne({ observateurId: observateurId })
            .then(async () => {
                    await CompletedFamilleFiveLevFive.updateOne({ observateurId: observateurId }, {
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