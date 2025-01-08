import { DescriptionFamilleFourLevFour } from "../../../models/appareil_levage/famille4_lev4/description.mjs";
import { CompletedFamilleFourLevFour } from "../../../models/appareil_levage/famille4_lev4/completed.mjs";
import { query, body, validationResult, matchedData, checkSchema } from "express-validator"
import { checkEmpty } from "../../../middelwares/description/checkEmpty.mjs";

const create = async (request, response) => {

    try {
        const {
            body : {
                marquage,   
                chargeMaximaleUtile,
                hauteurElevation,  
                extensionPlateforme,
                deversAutorise,     
                nombrePersonnes,   
                portee,
                mecanismes,
                sourceEnergie,
                translation,
                chainesCablesElevation,
                caracteristiquesSuspenteOne,
                caracteristiquesSuspenteTow,
                siPresence,
                observateurId
            }
        } = request;

        // get renseignement
        const description = await DescriptionFamilleFourLevFour.findOne({ observateurId: request.body.observateurId });

        if (description) {
            await DescriptionFamilleFourLevFour.updateOne({ observateurId: request.body.observateurId }, { $set: {                 
                marquage : marquage,   
                chargeMaximaleUtile : chargeMaximaleUtile,
                hauteurElevation : hauteurElevation,  
                extensionPlateforme : extensionPlateforme,
                deversAutorise : deversAutorise,     
                nombrePersonnes : nombrePersonnes,   
                portee : portee,
                mecanismes : mecanismes,
                sourceEnergie : sourceEnergie,
                translation : translation,
                chainesCablesElevation : chainesCablesElevation,
                caracteristiquesSuspenteOne : caracteristiquesSuspenteOne,
                caracteristiquesSuspenteTow : caracteristiquesSuspenteTow,
                siPresence : siPresence,
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
            
            await DescriptionFamilleFourLevFour({
                marquage : marquage,   
                chargeMaximaleUtile : chargeMaximaleUtile,
                hauteurElevation : hauteurElevation,  
                extensionPlateforme : extensionPlateforme,
                deversAutorise : deversAutorise,     
                nombrePersonnes : nombrePersonnes,   
                portee : portee,
                mecanismes : mecanismes,
                sourceEnergie : sourceEnergie,
                translation : translation,
                chainesCablesElevation : chainesCablesElevation,
                caracteristiquesSuspenteOne : caracteristiquesSuspenteOne,
                caracteristiquesSuspenteTow : caracteristiquesSuspenteTow,
                siPresence : siPresence,
                observateurId : observateurId
                })
                .save()
                .then(async(result) => {
    
                    await CompletedFamilleFourLevFour.updateOne({ observateurId: observateurId }, {
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
        const description = await DescriptionFamilleFourLevFour.findOne({ observateurId : observateurId });
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
        await DescriptionFamilleFourLevFour.deleteOne({ observateurId: observateurId })
            .then(async () => {
                    await CompletedFamilleFourLevFour.updateOne({ observateurId: observateurId }, {
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