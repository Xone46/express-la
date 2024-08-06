
import { RenseignementLevageA } from "../../models/gth_famille_ac1/renseignementLevageA.mjs";
import { CompletedLevageA } from "../../models/gth_famille_ac1/completedLevageA.mjs";
import { Observateur } from "../../models/observateur.mjs";
// import { query, body, validationResult, matchedData, checkSchema } from "express-validator"
// import { checkEmpty } from "../../middelwares/renseignement/checkEmpty.mjs";

const create = async (request, response) => {

    try {

        // get renseignement
        const renseignementLevageA = await RenseignementLevageA.findOne({ observateurId: request.body.observateurId });
       
        if (renseignementLevageA) {

            await RenseignementLevageA.updateOne({ observateurId: request.body.observateurId }, {
                $set: {
                    etablissement : request.body.etablissement,
                    adresse : request.body.adresse,
                    etendueVerification : request.body.etendueVerification,
                    personneCompteRendu : request.body.personneCompteRendu,
                    nomVerificateur : request.body.nomVerificateur,
                    rapportPrecedent : request.body.rapportPrecedent,
                    datePrecedenteVerification : request.body.datePrecedenteVerification,
                    documents : request.body.documents,
                    dateDuree : request.body.dateDuree
                }
            })
                .then(async(result) => {

                await CompletedLevageA.updateOne({ observateurId: request.body.observateurId }, {
                            $set: { 
                                renseignement: true
                            } 
                        })
                        .then(() => {
                            response.status(201).json({ msg: "Modifié avec succès", renseignementId: result._id });
                        })
                        .catch((error) => {
                            response.status(400).json(error);
                        })
                })
                .catch((error) => {
                    console.log(error);
                    response.status(400).json(error);
                });

        } else {

            await RenseignementLevageA(request.body)
                .save()
                .then(async () => {

                    await CompletedLevageA.updateOne({ observateurId: request.body.observateurId }, {
                        $set: { 
                            renseignement: true
                        } 
                    })
                    .then(() => {
                        response.status(201).json({ msg: "Enregistré avec succès", renseignementId: result._id });
                    })
                    .catch((error) => {
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
        await RenseignementLevageA.deleteOne({ observateurId: observateurId })
            .then(async () => {
                await CompletedLevageA.updateOne({ observateurId: observateurId }, {
                    $set: {
                        renseignement: false,
                    }
                })
                .then(() => {
                    response.status(201).json({ msg: "Deleted Done!" });
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
        const renseignement = await RenseignementLevageA.findOne({ observateurId: observateurId }); 
        if(renseignement) {

            response.status(200).json({ renseignement : renseignement,  checkEmptyStatus : checkEmptyStatus });
        } else {
            response.status(200).json({ renseignement : renseignement,  checkEmptyStatus : false });
        }


    } catch (error) {
        console.log(error)
        response.status(400).json(error);
    }
}



const read = async (request, response) => {

    try {
        const completedCount = await Observateur.find({ etat : true }).count();
        response.status(200).json(completedCount);
    } catch (error) {
        response.status(400).json(error)
    }
}

const checkRenseignement = async (request, response) => {
    const observateurId = String(request.params.observateurId);
    try {
        const renseignementLevageA = await RenseignementLevageA.find({ observateurId: observateurId });
        if (renseignementLevageA.length == 0) {
            response.status(200).json(false);
        } else {
            response.status(200).json(true);
        }

    } catch (error) {
        response.status(400).json(error);
    }
}







export default { create, select, reset, read, checkRenseignement }