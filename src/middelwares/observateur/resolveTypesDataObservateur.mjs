export const resolveTypesDataIntervention = (request, response, next) => {

    try {

        // fixed types data request
        const body = {
            date: request.body.date,
            numeroAffaire: String(request.body.type),
            site: parseInt(request.body.mission),
            etablissement: String(request.body.constructeur),
            repere: String(request.body.numeroSerie),
            adresse: String(request.body.numeroInterne),
            codePostal: String(request.body.localisation)
        }

        request.body = body;

        next();

    } catch (error) {
        response.status(400).json(error);
    }

}