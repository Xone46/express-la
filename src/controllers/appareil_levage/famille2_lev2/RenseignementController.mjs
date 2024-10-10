
import { RenseignementFamilleTowLevTow } from "../../../models/appareil_levage/famille2_lev2/renseignement.mjs";
import { CompletedFamilleTowLevTow } from "../../../models/appareil_levage/famille2_lev2/completed.mjs";
import { query, body, validationResult, matchedData, checkSchema } from "express-validator"
import { checkEmpty } from "../../../middelwares/renseignement/checkEmpty.mjs";

const create = async (request, response) => {


    try {

        // get renseignement
        const renseignement = await RenseignementFamilleTowLevTow.findOne({ observateurId: request.body.observateurId });
        if (renseignement) {

            await RenseignementFamilleTowLevTow.updateOne({ observateurId: request.body.observateurId }, {
                $set: {
                    constructeur : request.body.constructeur,  
                    typeConstructeur : request.body.typeConstructeur,  
                    anneeMiseService : request.body.anneeMiseService,  
                    numeroSerie : request.body.numeroSerie,  
                    numeroInterne : request.body.numeroInterne,  
                    suiveNumeroInterne : request.body.suiveNumeroInterne,  
                    localisation : request.body.localisation,  
                    typeAppareil : request.body.typeAppareil,
                    suiveTypeAppareil : request.body.suiveTypeAppareil,  
                    miseEnServiceRapport : request.body.miseEnServiceRapport,  
                    miseEnServiceEpreuves : request.body.miseEnServiceEpreuves,  
                    suiveMiseEnServiceEpreuves : request.body.suiveMiseEnServiceEpreuves,  
                    dateDerniereVerficationPeriodique : request.body.dateDerniereVerficationPeriodique,  
                    suiveDateDerniereVerficationPeriodique : request.body.suiveDateDerniereVerficationPeriodique,
                    rapport : request.body.rapport,  
                    essaischarge : request.body.essaischarge,
                    suiveEssaischarge : request.body.suiveEssaischarge,  
                    modification : request.body.modification,
                    suiveModification : request.body.suiveModification,  
                    observateurId : request.body.observateurId
                }
            })
                .then(async(result) => {

                await CompletedFamilleTowLevTow .updateOne({ observateurId: request.body.observateurId }, {
                            $set: { 
                                renseignement: true
                            } 
                        })
                        .then(() => {
                            response.status(201).json({ msg: "Modifié avec succès", renseignementId: result._id });
                        })
                        .catch((error) => {
                            console.log(error.message)
                            response.status(400).json(error);
                        })
                })
                .catch((error) => {
                    console.log(error)
                    response.status(400).json(error);
                });

        } else {

            await Renseignement(request.body)
                .save()
                .then(async () => {

                    await CompletedFamilleTowLevTow .updateOne({ observateurId: request.body.observateurId }, {
                        $set: { 
                            renseignement: true
                        } 
                    })
                    .then((result) => {
                        response.status(201).json({ msg: "Enregistré avec succès", renseignementId: result._id });
                    })
                    .catch((error) => {
                        console.log(error.message)
                        response.status(400).json(error);
                    });

                })
                .catch((error) => {
                    console.log(error)
                    response.status(400).json(error);
                });
        }



    } catch (error) {
        console.log(error)
        response.status(400).json(error);
    }

}



const reset = async (request, response) => {

    try {
        const observateurId = String(request.params.observateurId);
        await RenseignementFamilleTowLevTow.deleteOne({ observateurId: observateurId })
            .then(async () => {
                await CompletedFamilleTowLevTow .updateOne({ observateurId: observateurId }, {
                    $set: {
                        renseignement: false,
                    }
                })
                .then(() => {
                    response.status(201).json(true);
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

const select = async (request, response) => {

    try {

        const observateurId = String(request.params.observateurId);
        const renseignement = await RenseignementFamilleTowLevTow.findOne({ observateurId: observateurId }); 
        if(renseignement) {
            response.status(200).json({ renseignement : renseignement });
        }
    } catch (error) {
        console.log(error)
        response.status(400).json(error);
    }

}


export default { create, select, reset }