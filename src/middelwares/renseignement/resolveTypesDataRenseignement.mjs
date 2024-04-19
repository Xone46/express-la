export const resolveTypesDataRenseignement = (request, response, next) => {

    try {

        const body = {
            constructeur : String(request.body.constructeur),
            typeConstructeur : String(request.body.typeConstructeur),
            numeroSerie : String(request.body.numeroSerie),
            anneeMiseService : String(request.body.anneeMiseService),
            numeroSerie : String(request.body.numeroSerie),
            numeroInterne : String(request.body.numeroInterne),
            numeroInterneAutre : String(request.body.numeroInterneAutre),
            localisation : String(request.body.localisation),
            typeAppareil : String(request.body.typeAppareil),
            typeAppareilAutre : String(request.body.typeAppareilAutre),
            miseEnServiceRapport : String(request.body.miseEnServiceRapport),
            miseEnServiceEpreuves : String(request.body.miseEnServiceEpreuves),
            miseEnServiceEpreuvesAutre : String(request.body.miseEnServiceEpreuvesAutre),
            dateDerniereVerficationPeriodique : String(request.body.dateDerniereVerficationPeriodique),
            dateDerniereVerficationPeriodiqueAutre : String(request.body.dateDerniereVerficationPeriodiqueAutre),
            dateDerniereVerficationPeriodiqueRapport : String(request.body.dateDerniereVerficationPeriodiqueRapport),
            essaischarge :  String(request.body.essaischarge),
            essaischargeAutre : String(request.body.essaischargeAutre),
            modification : String(request.body.modification),
            modificationAutre : String(request.body.modificationAutre),
            observateurId : String(request.body.observateurId)
        }

        request.body = body;

        next();

    } catch (error) {
        console.log(error)
        response.status(400).json(error);
    }

}