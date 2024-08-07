export const resolveTypesDataObservateur = (request, response, next) => {

    try {

        const body = {
            date : request.body.date,
            metier : String(request.body.metier),
            interventionId : String(request.body.interventionId),
            typeVerification : String(request.body.typeVerification),
            typeAppareil : request.body.typeAppareil,
            typeRapport : String(request.body.typeAppareil[0]),
            coordonnees : String(request.body.coordonnees),
            equipement : String(request.body.equipement),
            constructeur : String(request.body.constructeur),
            numeroSerie : String(request.body.numeroSerie),
            numeroInterne : String(request.body.numeroInterne),
            localisation : String(request.body.localisation),
            marquage : String(request.body.marquage),
            accompagnateurClient : String(request.body.accompagnateurClient),
            accompagnateurInspecteur : String(request.body.accompagnateurInspecteur),
        }

        request.body = body;

        next();

    } catch (error) {
        response.status(400).json(error);
    }

}