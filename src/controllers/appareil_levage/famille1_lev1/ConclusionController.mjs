
import { ConclusionFamilleOneLevOne } from "../../../models/appareil_levage/famille1_lev1/conclusion.mjs";
import { CompletedFamilleOneLevOne } from "../../../models/appareil_levage/famille1_lev1/completed.mjs";
import { query, body, validationResult, matchedData, checkSchema } from "express-validator"



const create = async (request, response) => {

    try {

        const { a, b, c, d, e, f, g, poids, commentaire, observateurId, child } = request.body;
        const conclusion = await ConclusionFamilleOneLevOne.findOne({ observateurId: request.body.observateurId });

        if(conclusion) {

            await ConclusionFamilleOneLevOne.updateOne({ observateurId: request.body.observateurId }, {
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

                await CompletedFamilleOneLevOne.updateOne({ observateurId: request.body.observateurId }, {
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

            await Conclusion({ a, b, c, d, e, f, g, poids, commentaire, observateurId, child })
            .save()
            .then(async () => {

                await CompletedFamilleOneLevOne.updateOne({ observateurId: observateurId }, {
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
        const conclusion = await ConclusionFamilleOneLevOne.deleteOne({ observateurId : observateurId });
        if(conclusion.deletedCount == 1) {
                await CompletedFamilleOneLevOne.updateOne({ observateurId: observateurId }, {
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
        const conclusion = await ConclusionFamilleOneLevOne.findOne({ observateurId : observateurId });
        response.status(200).json(conclusion);


    } catch (error) {
        console.log(error)
        response.status(400).json(error);
    }

}

export default { create , select, reset }