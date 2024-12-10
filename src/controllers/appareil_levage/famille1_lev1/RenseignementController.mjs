
import { RenseignementFamilleOneLevOne } from "../../../models/appareil_levage/famille1_lev1/renseignement.mjs";
import { CompletedFamilleOneLevOne} from "../../../models/appareil_levage/famille1_lev1/completed.mjs";
import { query, body, validationResult, matchedData, checkSchema } from "express-validator"
import { checkEmpty } from "../../../middelwares/renseignement/checkEmpty.mjs";

const create = async (request, response) => {


    try {

        // get renseignement
        const renseignement = await RenseignementFamilleOneLevOne.findOne({ observateurId: request.body.observateurId });
        if (renseignement) {

            await RenseignementFamilleOneLevOne.updateOne({ observateurId: request.body.observateurId }, {
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

                await CompletedFamilleOneLevOne.updateOne({ observateurId: request.body.observateurId }, {
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

            await RenseignementFamilleOneLevOne(request.body)
                .save()
                .then(async () => {

                    await CompletedFamilleOneLevOne.updateOne({ observateurId: request.body.observateurId }, {
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
        await RenseignementFamilleOneLevOne.deleteOne({ observateurId: observateurId })
            .then(async () => {
                await CompletedFamilleOneLevOne.updateOne({ observateurId: observateurId }, {
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
        const renseignement = await RenseignementFamilleOneLevOne.findOne({ observateurId: observateurId });
        if(renseignement) {
            response.status(200).json({ renseignement : renseignement });
        } else {
            response.status(200).json({ renseignement : null });
        }

    } catch (error) {
        console.log(error)
        response.status(400).json(error);
    }

}


export default { create, select, reset }