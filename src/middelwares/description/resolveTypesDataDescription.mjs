export const resolveTypesDataDescription = (request, response, next) => {
    try {
        // fixed types data request
        const body = {
            marquage: String(request.body.marquage),
            modeDeLevage: String(request.body.modeDeLevage),
            caracteristiques: String(request.body.caracteristiques),
            levageAuxiliaire: request.body.levageAuxiliaire,
            modeInstallation: String(request.body.modeInstallation),
            modeInstallationDetails: String(request.body.modeInstallationDetails),
            modeInstallationDetailsAutre: String(request.body.modeInstallationDetailsAutre),
            sourceDenergie: request.body.sourceDenergie,
            observateurId: request.body.observateurId
        }

        request.body = body;

        next();

    } catch (error) {
        response.status(400).json(error)
    }

}