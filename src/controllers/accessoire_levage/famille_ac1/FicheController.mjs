import { Fiche } from "../../../models/accessoire_levage/famille_ac1/fiche.mjs";
import { Completed } from "../../../models/accessoire_levage/famille_ac1/completed.mjs";

const create = async (request, response) => {

    console.log(request.body);

        try {

            const fiche = await Fiche.findOne({ observateurId: request.body.observateurId });

            if (fiche) {
    
                await Fiche.updateOne({ observateurId: request.body.observateurId }, {
                    $set: {
                        observateurId: request.body.observateurId,
                        fiches : request.body.fiches
                    }
                })
                .then(async(result) => {
    
                    await Completed.updateOne({ observateurId: request.body.observateurId }, {
                                $set: { 
                                    fiche: true
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
                        response.status(400).json(error);
                    });
    
            } else {
    
                await Fiche(request.body)
                    .save()
                    .then(async () => {
    
                        await Completed.updateOne({ observateurId: request.body.observateurId }, {
                            $set: { 
                                fiche: true
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
            response.status(400).json(error);
        }

}



const reset = async (request, response) => {

    try {

        const observateurId = String(request.params.observateurId);

        await Fiche.deleteOne({ observateurId: observateurId })
            .then(async () => {

                await Completed.updateOne({ observateurId: observateurId }, {
                    $set: {
                        fiche: false,
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
        const fiches = await Fiche.findOne({ observateurId: observateurId }); 

        if(fiches) {
            response.status(200).json(fiches);
        }

    } catch (error) {
        console.log(error)
        response.status(400).json(error);
    }

}


export default { create, reset, select }