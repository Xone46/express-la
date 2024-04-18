export const checkEmpty = (data) => {

try{

        const values = [
            data.marquage == "" || null ? false : true,
            data.modeDeLevage == "" || null ? false : true,
            data.caracteristiques[0].chargeMaximaleUtile == "" || null ? false : true,
            data.caracteristiques[0].hauteurDeLevage == "" || null ? false : true,
            data.caracteristiques[0].portee == "" || null ? false : true,
            data.caracteristiques[0].porteFaux == "" || null ? false : true,
            data.caracteristiques[0].longueurDuCheminDeRoulement == "" || null ? false : true,
            data.caracteristiques[0].suspentes == "" || null ? false : true,
            data.caracteristiques[0].suspentesAutre == "" || null ? false : true,
            data.caracteristiques[0].mouflage == "" || null ? false : true,
            data.caracteristiques[0].diametre == "" || null ? false : true,
            data.levageAuxiliaire == "" || null ? false : true,
            data.modeInstallation == "" || null ? false : true,
            data.sourceDenergie == "" || null ? false : true
        ];

        const allEqual = arr => arr.every(val => val === arr[0]);
        const result = allEqual(values);
        return result;

    } catch (error) {
        console.log(error)
        response.status(400).json(error);
    }

}