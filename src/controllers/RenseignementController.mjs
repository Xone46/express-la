
import { Renseignement } from "../models/renseignement.mjs";
import { query, body, validationResult, matchedData, checkSchema } from "express-validator"


const create = async (request, response) => {

    try {

        const renseignement = await Renseignement.findOne({ observateurId: request.body.observateurId })
        if (renseignement) {
            await Renseignement.updateOne({ observateurId: request.body.observateurId }, {
                $set: {
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
                .then(async (result) => {
                    response.status(201).json({ msg: "Modifié avec succès", renseignementId: result._id });
                })
                .catch((error) => {
                    console.log(error)
                    response.status(400).json(error);
                });

        } else {

            await Renseignement(request.body)
                .save()
                .then(async (result) => {
                    response.status(201).json({ msg: "Enregistré avec succès", renseignementId: result._id });
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


// const reset = async (request, response) => {

//     var {
//         typeConstructeur,
//         anneeMiseService,
//         numeroSerie,
//         numeroInterne,
//         numeroInterneAutre,
//         localisation,
//         typeAppareil,
//         typeAppareilAutre,
//         miseEnServiceRapport,
//         miseEnServiceEpreuves,
//         miseEnServiceEpreuvesAutre,
//         dateDerniereVerficationPeriodique,
//         dateDerniereVerficationPeriodiqueAutre,
//         dateDerniereVerficationPeriodiqueRapport,
//         essaischarge,
//         essaischargeAutre,
//         modification,
//         modificationAutre,
//     } = request.body.resteRenseignement;


//     try {

//         await Renseignement.updateOne({ observateurId: request.body.observateurId }, {
//             $set: {
//                 typeConstructeur: typeConstructeur,
//                 anneeMiseService: anneeMiseService,
//                 numeroSerie: numeroSerie,
//                 numeroInterne: numeroInterne,
//                 numeroInterneAutre: numeroInterneAutre,
//                 localisation: localisation,
//                 typeAppareil: typeAppareil,
//                 typeAppareilAutre: typeAppareilAutre,
//                 miseEnServiceRapport: miseEnServiceRapport,
//                 miseEnServiceEpreuves: miseEnServiceEpreuves,
//                 miseEnServiceEpreuvesAutre: miseEnServiceEpreuvesAutre,
//                 dateDerniereVerficationPeriodique: dateDerniereVerficationPeriodique,
//                 dateDerniereVerficationPeriodiqueAutre: dateDerniereVerficationPeriodiqueAutre,
//                 dateDerniereVerficationPeriodiqueRapport: dateDerniereVerficationPeriodiqueRapport,
//                 essaischarge: essaischarge,
//                 essaischargeAutre: essaischargeAutre,
//                 modification: modification,
//                 modificationAutre: modificationAutre
//             }
//         })
//             .then(async (result) => {
//                 response.status(201).json({ msg: "Modifié avec succès", renseignementId: result._id });
//             })
//             .catch((error) => {
//                 console.log(error)
//                 response.status(400).json(error);
//             });

//     } catch (error) {
//         console.log(error)
//         response.status(400).json(error);
//     }

// }


const reset = async (request, response) => {

    try {
        const observateurId = String(request.params.observateurId);
        await Renseignement.deleteOne({ observateurId: observateurId })
            .then(async (result) => {
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

const select = async (request, response) => {

    try {

        const observateurId = String(request.params.observateurId);
        const observateur = await Renseignement.findOne({ observateurId: observateurId });
        response.status(200).json(observateur);

    } catch (error) {
        console.log(error)
        response.status(400).json(error);
    }

}


export default { create, select, reset }