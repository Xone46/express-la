export const resolveTypesDataIntervention = (request, response, next) => {

    try {


        // fixed types data request
        const body = {
            date: request.body.date,
            coordonnees: request.body.coordonnees,
            numeroAffaire: String(request.body.numeroAffaire),
            site: parseInt(request.body.site),
            etablissement: String(request.body.etablissement),
            repere: String(request.body.repere),
            adresse: String(request.body.adresse),
            codePostal: String(request.body.codePostal),
            ville: String(request.body.ville),
            pays: String(request.body.pays),
            metier: String(request.body.metier)
        }


        request.body = body;

        next();

    } catch (error) {
        response.status(400).json(error)
    }

}