export const resolveTypesDataExamen = (request, response, next) => {

    try {
        // fixed types data request
        const body = {
            a: request.body.a,
            b: request.body.b,
            c: request.body.c,
            d: request.body.d,
            e: request.body.e,
            f: request.body.f,
            g: request.body.g,
            h: request.body.h,
            i: request.body.i,
            j: request.body.j,
            k: request.body.k,
            observateurId: request.body.observateurId
        }

        request.body = body;

        next();

    } catch (error) {
        response.status(400).json(error)
    }

}