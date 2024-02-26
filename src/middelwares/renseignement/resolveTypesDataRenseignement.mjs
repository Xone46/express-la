export const resolveTypesDataRenseignement = (request, response, next) => {

    console.log(request.body);

    try {
        const body = {
            typeConstructeur : String(request.body.typeConstructeur),
            anneeMiseService : String(request.body.anneeMiseService),
            numeroSerie : String(request.body.numeroSerie),
            numeroInterne : String(request.body.numeroInterne),
            valueNumeroInterne : String(request.body.valueNumeroInterne),
            localisation : String(request.body.localisation),
            typeAppareil : String(request.body.typeAppareil),
            modification : String(request.body.modification),
            description : String(request.body.description),
            essaischarge : String(request.body.essaischarge),
            miseEnService : String(request.body.miseEnService),
            epreuvemMiseEnService : String(request.body.epreuvemMiseEnService),
            dateDerniereVerficationPeriodique : String(request.body.dateDerniereVerficationPeriodique),
            realiseesMiseEnService : request.body.realiseesMiseEnService,
            epreuveDateDerniereVerficationPeriodique : String(request.body.epreuveDateDerniereVerficationPeriodique),
            realiseesDateDerniereVerficationPeriodique : request.body.realiseesDateDerniereVerficationPeriodique,
            poidsKg : parseFloat(request.body.poidsKg)
        }

        request.body = body;

        next();

    } catch (error) {
        response.status(400).json(error);
    }

}