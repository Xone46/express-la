
import { Renseignement } from "../models/renseignement.mjs";
import { query, body, validationResult, matchedData, checkSchema } from "express-validator"


const create = async (request, response) => {

    try {

        await Renseignement(request.body)
            .save()
            .then(async (result) => {
                response.status(201).json({ msg: "Enregistré avec succès" , renseignementId : result._id });
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


const update = async (request, response) => {

    var {
        typeConstructeur,
        anneeMiseService,
        numeroSerie,
        numeroInterne,
        numeroInterneAutre,
        localisation,
        typeAppareil,
        typeAppareilAutre,
        miseEnServiceRapport,
        miseEnServiceEpreuves,
        miseEnServiceEpreuvesAutre,
        dateDerniereVerficationPeriodique,
        dateDerniereVerficationPeriodiqueAutre,
        dateDerniereVerficationPeriodiqueRapport,
        essaischarge,
        essaischargeAutre,
        modification,
        modificationAutre,
    } = request.body.renseignement;


    try {

        await Renseignement.updateOne({ observateurId : request.body.observateurId }, { $set : { 
            typeConstructeur : typeConstructeur,
            anneeMiseService : anneeMiseService,
            numeroSerie : numeroSerie,
            numeroInterne : numeroInterne,
            numeroInterneAutre : numeroInterneAutre,
            localisation : localisation,
            typeAppareil : typeAppareil,
            typeAppareilAutre : typeAppareilAutre,
            miseEnServiceRapport : miseEnServiceRapport,
            miseEnServiceEpreuves : miseEnServiceEpreuves,
            miseEnServiceEpreuvesAutre : miseEnServiceEpreuvesAutre,
            dateDerniereVerficationPeriodique : dateDerniereVerficationPeriodique,
            dateDerniereVerficationPeriodiqueAutre : dateDerniereVerficationPeriodiqueAutre,
            dateDerniereVerficationPeriodiqueRapport : dateDerniereVerficationPeriodiqueRapport,
            essaischarge : essaischarge,
            essaischargeAutre : essaischargeAutre,
            modification : modification,
            modificationAutre : modificationAutre
         }})
        .then(async (result) => {
            console.log(result);
            response.status(201).json({ msg: "Modifié avec succès" , renseignementId : result._id });
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
        const observateur = await Renseignement.findOne({ observateurId : observateurId });
        response.status(200).json(observateur);

    } catch (error) {
        console.log(error)
        response.status(400).json(error);
    }

}


export default { create, select, update }