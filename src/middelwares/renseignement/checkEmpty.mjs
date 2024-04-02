export const checkEmpty = (data) => {

    try {

        const values = [
            data.typeConstructeur == "" || null ? false : true,
            data.anneeMiseService == "" || null ? false : true,
            data.numeroSerie == "" || null ? false : true,
            data.numeroInterne == "" || null ? false : true,
            data.numeroInterneAutre == "" || null ? false : true,
            data.localisation == "" || null ? false : true,
            data.typeAppareil == "" || null ? false : true,
            data.miseEnServiceRapport == "" || null ? false : true,
            data.miseEnServiceEpreuves == "" || null ? false : true,
            data.dateDerniereVerficationPeriodique == "" || null ? false : true,
            data.dateDerniereVerficationPeriodiqueRapport == "" || null ? false : true,
            data.essaischarge == "" || null ? false : true,
            data.modification == "" || null ? false : true
        ];

        const allEqual = arr => arr.every(val => val === arr[0]);
        const result = allEqual(values);
        return result;


    } catch (error) {
        console.log(error)
        response.status(400).json(error);
    }

}