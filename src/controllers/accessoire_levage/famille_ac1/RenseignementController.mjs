import { Renseignement } from "../../../models/accessoire_levage/famille_ac1/renseignement.mjs";
import { Completed } from "../../../models/accessoire_levage/famille_ac1/completed.mjs";

const create = async (request, response) => {

        try {

            const renseignement = await Renseignement.findOne({ observateurId: request.body.observateurId });

            
            if (renseignement) {
    
                await Renseignement.updateOne({ observateurId: request.body.observateurId }, {
                    $set: {
                        observateurId: request.body.observateurId,
                        etablissement: request.body.etablissement,
                        adresse: request.body.adresse,
                        etendueVerification: request.body.etendueVerification,
                        accompagnateurClient: request.body.accompagnateurClient,
                        personneCompteRendu: request.body.personneCompteRendu,
                        nomVerificateur: request.body.nomVerificateur,
                        rapportPrecedent: request.body.rapportPrecedent,
                        datePrecedenteVerification: request.body.datePrecedenteVerification,
                        documents: request.body.documents,
                        dateDuree: request.body.dateDuree
                    }
                })
                .then(async(result) => {
    
                    await Completed.updateOne({ observateurId: request.body.observateurId }, {
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
                        console.log(error)
                        response.status(400).json(error);
                    });
    
            } else {
    
                await Renseignement(request.body)
                    .save()
                    .then(async () => {
    
                        await Completed.updateOne({ observateurId: request.body.observateurId }, {
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
            response.status(400).json(error);
        }

}

const reset = async (request, response) => {

    try {
        const observateurId = String(request.params.observateurId);
        await Renseignement.deleteOne({ observateurId: observateurId })
            .then(async () => {
                await Completed.updateOne({ observateurId: observateurId }, {
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
        const renseignement = await Renseignement.findOne({ observateurId: observateurId }); 
        if(renseignement) {
            const checkEmptyStatus = checkEmpty(renseignement) ;
            response.status(200).json({ renseignement : renseignement,  checkEmptyStatus : checkEmptyStatus });
        } else {
            response.status(200).json({ renseignement : renseignement,  checkEmptyStatus : false });
        }


    } catch (error) {
        console.log(error)
        response.status(400).json(error);
    }

}


export default { create, reset, select }