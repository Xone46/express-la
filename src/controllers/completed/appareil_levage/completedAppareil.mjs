import { CompletedFamilleOneLevOne } from "../../../models/appareil_levage/famille1_lev1/completed.mjs";
import { CompletedFamilleTowLevTow } from "../../../models/appareil_levage/famille2_lev2/completed.mjs";
import { CompletedFamilleTreeLevTree } from "../../../models/appareil_levage/famille3_lev3/completed.mjs";
import { CompletedFamilleFourLevFour } from "../../../models/appareil_levage/famille4_lev4/completed.mjs";
import { CompletedFamilleFiveLevFive } from "../../../models/appareil_levage/famille5_lev5/completed.mjs";

const save = async (request, response, id) => {


    if (request.body.typeAppareil[0] == "Famille 1 LEV1") {
        
        await CompletedFamilleOneLevOne({
            observateurId: id,
            renseignement: false,
            description: false,
            examen: false,
            conclusion: false,
            photo: false
        }).save()
            .then(() => {
                response.status(201).json({ msg: "Enregistré avec succès" });
            })
            .catch((error) => {
                console.log(error)
                response.status(400).json(error);
            });
    }

    if (request.body.typeAppareil[0] == "Famille 2 LEV2") {

        await CompletedFamilleTowLevTow({
            observateurId: id,
            renseignement: false,
            description: false,
            examen: false,
            conclusion: false,
            photo: false
        }).save()
            .then(() => {
                response.status(201).json({ msg: "Enregistré avec succès" });
            })
            .catch((error) => {
                console.log(error)
                response.status(400).json(error);
            });
    }


    if (request.body.typeAppareil[0] == "Famille 3 LEV3") {

        await CompletedFamilleTreeLevTree({
            observateurId: id,
            renseignement: false,
            description: false,
            examen: false,
            conclusion: false,
            photo: false
        }).save()
            .then(() => {
                response.status(201).json({ msg: "Enregistré avec succès" });
            })
            .catch((error) => {
                console.log(error)
                response.status(400).json(error);
            });
    }

    if (request.body.typeAppareil[0] == "Famille 4 LEV4") {

        await CompletedFamilleFourLevFour({
            observateurId: id,
            renseignement: false,
            description: false,
            examen: false,
            conclusion: false,
            photo: false
        }).save()
            .then(() => {
                response.status(201).json({ msg: "Enregistré avec succès" });
            })
            .catch((error) => {
                console.log(error)
                response.status(400).json(error);
            });
    }


    
    if (request.body.typeAppareil[0] == "Famille 5 LEV5") {

        await CompletedFamilleFiveLevFive({
            observateurId: id,
            renseignement: false,
            description: false,
            examen: false,
            conclusion: false,
            photo: false
        }).save()
            .then(() => {
                response.status(201).json({ msg: "Enregistré avec succès" });
            })
            .catch((error) => {
                console.log(error)
                response.status(400).json(error);
            });
    }


}

export default { save }