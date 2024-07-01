
import { Renseignement } from "../models/renseignement.mjs";
import { Completed } from "../models/completed.mjs";
import { query, body, validationResult, matchedData, checkSchema } from "express-validator"
import { checkEmpty } from "../middelwares/renseignement/checkEmpty.mjs";

const create = async (request, response) => {

    try {

        // get renseignement
        const renseignement = await Renseignement.findOne({ observateurId: request.body.observateurId });
       
        if (renseignement) {

            await Renseignement.updateOne({ observateurId: request.body.observateurId }, {
                $set: {
                    constructeur: request.body.constructeur,
                    typeConstructeur: request.body.typeConstructeur,
                    numeroSerie: request.body.numeroSerie,
                    anneeMiseService: request.body.anneeMiseService,
                    numeroInterne: request.body.numeroInterne,
                    numeroInterneAutre: request.body.numeroInterneAutre,
                    localisation: request.body.localisation,
                    typeAppareil: request.body.typeAppareil,
                    typeAppareilAutre: request.body.typeAppareilAutre,
                    miseEnServiceRapport: request.body.miseEnServiceRapport,
                    miseEnServiceEpreuves: request.body.miseEnServiceEpreuves,
                    miseEnServiceEpreuvesAutre: request.body.miseEnServiceEpreuvesAutre,
                    dateDerniereVerficationPeriodique: request.body.dateDerniereVerficationPeriodique,
                    dateDerniereVerficationPeriodiqueAutre: request.body.dateDerniereVerficationPeriodiqueAutre,
                    dateDerniereVerficationPeriodiqueRapport: request.body.dateDerniereVerficationPeriodiqueRapport,
                    essaischarge: request.body.essaischarge,
                    essaischargeAutre: request.body.essaischargeAutre,
                    modification: request.body.modification,
                    modificationAutre: request.body.modificationAutre
                }
            })
                .then(async(result) => {

                await Completed.updateOne({ observateurId: request.body.observateurId }, {
                            $set: { 
                                renseignement: true
                            } 
                        })
                        .then(() => {
                            response.status(201).json({ msg: "Modifié avec succès", renseignementId: result._id });
                        })
                        .catch((error) => {
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

                    await Completed.updateOne({ observateurId: request.body.observateurId }, {
                        $set: { 
                            renseignement: true
                        } 
                    })
                    .then(() => {
                        response.status(201).json({ msg: "Enregistré avec succès", renseignementId: result._id });
                    })
                    .catch((error) => {
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
        await Renseignement.deleteOne({ observateurId: observateurId })
            .then(async () => {
                await Completed.updateOne({ observateurId: observateurId }, {
                    $set: {
                        renseignement: false,
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

const select = async (request, response) => {

    try {

        const observateurId = String(request.params.observateurId);
        const renseignement = await Renseignement.findOne({ observateurId: observateurId }); 
        if(renseignement) {
            const checkEmptyStatus = checkEmpty(renseignement) ;
            response.status(200).json({ renseignement : renseignement,  checkEmptyStatus : checkEmptyStatus });
        } else {
            response.status(200).json({ renseignement : renseignement,  checkEmptyStatus : false });
        }


    } catch (error) {
        console.log(error)
        response.status(400).json(error);
    }

}


export default { create, select, reset }