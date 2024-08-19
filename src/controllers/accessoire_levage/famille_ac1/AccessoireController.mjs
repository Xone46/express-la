import { Accessoire } from "../../../models/accessoire_levage/famille_ac1/accessoire.mjs";
import { Completed } from "../../../models/accessoire_levage/famille_ac1/completed.mjs";

const create = async (request, response) => {

        try {

            const accessoire = await Accessoire.findOne({ observateurId: request.body.observateurId });

            if (accessoire) {
    
                await Accessoire.updateOne({ observateurId: request.body.observateurId }, {
                    $set: {
                        observateurId: request.body.observateurId,
                        accessoires : request.body.accessoires
                    }
                })
                .then(async(result) => {
    
                    await Completed.updateOne({ observateurId: request.body.observateurId }, {
                                $set: { 
                                    accessoire: true
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
    
                await Accessoire(request.body)
                    .save()
                    .then(async () => {
    
                        await Completed.updateOne({ observateurId: request.body.observateurId }, {
                            $set: { 
                                accessoire: true
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

        await Accessoire.deleteOne({ observateurId: observateurId })
            .then(async () => {

                await Completed.updateOne({ observateurId: observateurId }, {
                    $set: {
                        accessoire: false,
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
        const accessoires = await Accessoire.findOne({ observateurId: observateurId }); 

        if(accessoires) {
            response.status(200).json(accessoires);
        }

    } catch (error) {
        console.log(error)
        response.status(400).json(error);
    }

}


export default { create, reset, select }