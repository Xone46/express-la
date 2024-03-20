export const resolveTypesDataObservateur = (request, response, next) => {

    try {

        const body = {
            date : request.body.date,
            interventionId : String(request.body.interventionId),
            typeVerification : String(request.body.typeVerification),
            categorieAppareil : String(request.body.categorieAppareil),
            equipement : String(request.body.equipement),
            constructeur : String(request.body.constructeur),
            numeroSerie : String(request.body.numeroSerie),
            numeroInterne : String(request.body.numeroInterne),
            localisation : String(request.body.localisation),
            marquage : String(request.body.marquage),
            accompagnateur : String(request.body.accompagnateur),
        }

        request.body = body;

        next();

    } catch (error) {
        response.status(400).json(error);
    }

}