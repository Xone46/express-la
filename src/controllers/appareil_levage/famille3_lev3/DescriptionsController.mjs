import { DescriptionFamilleTreeLevTree } from "../../../models/appareil_levage/famille3_lev3/description.mjs";
import { CompletedFamilleTreeLevTree } from "../../../models/appareil_levage/famille3_lev3/completed.mjs";
import { query, body, validationResult, matchedData, checkSchema } from "express-validator"
import { checkEmpty } from "../../../middelwares/description/checkEmpty.mjs";

const create = async (request, response) => {

    try {
        const {
            body : {
                marquage,
                chargeMaximaleUtile,
                distanceCentreGravite,
                chargeMaximalUtileHauteurLeveeMaximale,
                hauteurLeveeMaximale,
                chariotsSansMarquage,
                mecanismes,
                sourceEnergie,
                translation,
                dispositifsElevation,
                dispositifPrehension,
                equipementsInterchangable,
                siPresence,
                observateurId
            }
        } = request;

        // get renseignement
        const description = await DescriptionFamilleTreeLevTree.findOne({ observateurId: request.body.observateurId });

        if (description) {
            await DescriptionFamilleTreeLevTree.updateOne({ observateurId: request.body.observateurId }, { $set: {                 
                marquage :marquage,
                chargeMaximaleUtile : chargeMaximaleUtile,
                distanceCentreGravite : distanceCentreGravite,
                chargeMaximalUtileHauteurLeveeMaximale : chargeMaximalUtileHauteurLeveeMaximale,
                hauteurLeveeMaximale : hauteurLeveeMaximale,
                chariotsSansMarquage : chariotsSansMarquage,
                mecanismes : mecanismes,
                sourceEnergie : sourceEnergie,
                translation : translation,
                dispositifsElevation : dispositifsElevation,
                dispositifPrehension : dispositifPrehension,
                equipementsInterchangable : equipementsInterchangable,
                siPresence : siPresence,
                statusSiPresence : siPresence.length == 0 ? false: true,
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
            
            await DescriptionFamilleTreeLevTree({
                    marquage :marquage,
                    chargeMaximaleUtile : chargeMaximaleUtile,
                    distanceCentreGravite : distanceCentreGravite,
                    chargeMaximalUtileHauteurLeveeMaximale : chargeMaximalUtileHauteurLeveeMaximale,
                    hauteurLeveeMaximale : hauteurLeveeMaximale,
                    chariotsSansMarquage : chariotsSansMarquage,
                    mecanismes : mecanismes,
                    sourceEnergie : sourceEnergie,
                    translation : translation,
                    dispositifsElevation : dispositifsElevation,
                    dispositifPrehension : dispositifPrehension,
                    equipementsInterchangable : equipementsInterchangable,
                    siPresence : siPresence,
                    statusSiPresence : siPresence.length == 0 ? false: true,
                    observateurId : observateurId
                })
                .save()
                .then(async(result) => {
    
                    await CompletedFamilleTreeLevTree.updateOne({ observateurId: observateurId }, {
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
        const description = await DescriptionFamilleTreeLevTree.findOne({ observateurId : observateurId });

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
        await DescriptionFamilleTreeLevTree.deleteOne({ observateurId: observateurId })
            .then(async () => {
                    await CompletedFamilleTreeLevTree.updateOne({ observateurId: observateurId }, {
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