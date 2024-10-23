
import { RenseignementFamilleFiveLevFive } from "../../../models/appareil_levage/famille5_lev5/renseignement.mjs";
import { CompletedFamilleFiveLevFive} from "../../../models/appareil_levage/famille5_lev5/completed.mjs";
import { query, body, validationResult, matchedData, checkSchema } from "express-validator"
import { checkEmpty } from "../../../middelwares/renseignement/checkEmpty.mjs";

const create = async (request, response) => {

    try {

        // get renseignement
        const renseignement = await RenseignementFamilleFiveLevFive.findOne({ observateurId: request.body.observateurId });
        if (renseignement) {

            await RenseignementFamilleFiveLevFive.updateOne({ observateurId: request.body.observateurId }, {
                $set: {
                    constructeur: request.body.constructeur,
                    typeConstructeur: request.body.typeConstructeur,
                    anneeMiseService: request.body.anneeMiseService,
                    numeroSerie: request.body.numeroSerie,
                    numeroInterne: request.body.numeroInterne,
                    suiveNumeroInterne: request.body.suiveNumeroInterne,
                    localisation: request.body.localisation,
                    typeAppareil: request.body.typeAppareil,
                    suiveTypeAppareil: request.body.suiveTypeAppareil,
                    typeVerification: request.body.typeVerification,
                    suiveTypeVerification: request.body.suiveTypeVerification,
                    documentationTechniqueConstructeur: request.body.documentationTechniqueConstructeur,
                    epreuves: request.body.epreuves,
                    essaischarge: request.body.essaischarge,
                    suiveEssaischarge: request.body.suiveEssaischarge,
                    examenMontageInstallation: request.body.examenMontageInstallation,
                    modification: request.body.modification,
                    suiveModification: request.body.suiveModification,
                    observateurId: request.body.observateurId
                }
            })
                .then(async(result) => {

                await CompletedFamilleFiveLevFive.updateOne({ observateurId: request.body.observateurId }, {
                            $set: { 
                                renseignement: true
                            } 
                        })
                        .then(() => {
                            response.status(201).json({ msg: "Modifié avec succès", renseignementId: result._id });
                        })
                        .catch((error) => {
                            console.log(error.message)
                            response.status(400).json(error);
                        })
                })
                .catch((error) => {
                    console.log(error)
                    response.status(400).json(error);
                });

        } else {

            await RenseignementFamilleFiveLevFive(request.body)
                .save()
                .then(async () => {

                    await CompletedFamilleFiveLevFive.updateOne({ observateurId: request.body.observateurId }, {
                        $set: { 
                            renseignement: true
                        } 
                    })
                    .then((result) => {
                        response.status(201).json({ msg: "Enregistré avec succès", renseignementId: result._id });
                    })
                    .catch((error) => {
                        console.log(error.message)
                        response.status(400).json(error);
                    });

                })
                .catch((error) => {
                    console.log(error)
                    response.status(400).json(error);
                });
        }



    } catch (error) {
        console.log(error)
        response.status(400).json(error);
    }

}



const reset = async (request, response) => {

    try {
        const observateurId = String(request.params.observateurId);
        await RenseignementFamilleFiveLevFive.deleteOne({ observateurId: observateurId })
            .then(async () => {
                await CompletedFamilleFiveLevFive.updateOne({ observateurId: observateurId }, {
                    $set: {
                        renseignement: false,
                    }
                })
                .then(() => {
                    response.status(201).json(true);
                })
                .catch((error) => {
                    console.log(error)
                    response.status(400).json(error);
                });
            })
            .catch((error) => {
                console.log(error)
                response.status(400).json(error);
            });

    } catch (error) {
        console.log(error)
        response.status(400).json(error);
    }

}

const select = async (request, response) => {

    try {

        const observateurId = String(request.params.observateurId);
        const renseignement = await RenseignementFamilleFiveLevFive.findOne({ observateurId: observateurId }); 
        if(renseignement) {
            response.status(200).json({ renseignement : renseignement });
        }
    } catch (error) {
        console.log(error)
        response.status(400).json(error);
    }

}


export default { create, select, reset }