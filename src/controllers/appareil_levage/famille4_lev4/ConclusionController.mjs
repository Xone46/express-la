
import { ConclusionFamilleFourLevFour } from "../../../models/appareil_levage/famille4_lev4/conclusion.mjs";
import { CompletedFamilleFourLevFour } from "../../../models/appareil_levage/famille4_lev4/completed.mjs";
import { query, body, validationResult, matchedData, checkSchema } from "express-validator"



const create = async (request, response) => {

    try {

        const { a, b, c, d, e, f, g, poids, commentaire, observateurId, child } = request.body;
        const conclusion = await ConclusionFamilleFourLevFour.findOne({ observateurId: request.body.observateurId });

        if(conclusion) {

            await ConclusionFamilleFourLevFour.updateOne({ observateurId: request.body.observateurId }, {
                $set: {
                    a : request.body.a,  
                    b : request.body.b,  
                    c : request.body.c,  
                    d : request.body.d,
                    e : request.body.e,
                    f : request.body.f,
                    g : request.body.g,
                    poids : request.body.poids,
                    commentaire : request.body.commentaire,
                    child : request.body.child
                }
            })
                .then(async(result) => {

                await CompletedFamilleFourLevFour.updateOne({ observateurId: request.body.observateurId }, {
                            $set: { 
                                conclusion: true
                            } 
                        })
                        .then((result) => {
                            response.status(201).json({ msg: "Modifié avec succès", conclusionId : result._id });
                        })
                        .catch((error) => {
                            response.status(400).json(error);
                        })
                })
                .catch((error) => {
                    console.log(error)
                    response.status(400).json(error);
                });

        } else {

            await ConclusionFamilleFourLevFour({ a, b, c, d, e, f, g, poids, commentaire, observateurId, child })
            .save()
            .then(async () => {

                await CompletedFamilleFourLevFour.updateOne({ observateurId: observateurId }, {
                    $set: {
                        conclusion: true,
                    }
                })
                .then(() => {
                    response.status(201).json({ msg: "Enregistré avec succès" });
                })
                .catch((error) => {
                    console.log(error)
                    response.status(400).json(error);
                });

            })
            .catch((error) => {
                response.status(400).json(error);
                console.log(error)
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
        const conclusion = await ConclusionFamilleFourLevFour.deleteOne({ observateurId : observateurId });
        if(conclusion.deletedCount == 1) {
                await CompletedFamilleFourLevFour.updateOne({ observateurId: observateurId }, {
                    $set: {
                        conclusion: false,
                    }
                })
                .then(() => {
                    response.status(201).json({ msg: "Reset avec succès", observateurId : observateurId });
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


const select = async (request, response) => {

    try {

        const observateurId = String(request.params.observateurId);
        const conclusion = await ConclusionFamilleFourLevFour.findOne({ observateurId : observateurId });
        response.status(200).json(conclusion);


    } catch (error) {
        console.log(error)
        response.status(400).json(error);
    }

}

export default { create , select, reset }