import { Description } from "../models/description.mjs";
import { Completed } from "../models/completed.mjs";
import { query, body, validationResult, matchedData, checkSchema } from "express-validator"
import { checkEmpty } from "../middelwares/description/checkEmpty.mjs";

const create = async (request, response) => {


    try {
        const {
            body : {
                marquage,
                modeDeLevage,
                caracteristiques,
                levageAuxiliaire,
                detailsLevageAuxiliaire,
                modeInstallation,
                pose,
                suspendu,
                surMonorail,
                surPointFixe,
                surPotence,
                surPortique,
                autre,
                valueAutre,
                sourceDenergie,
                detailSourceDenergie,
                autreSourceDenergie,
                observateurId
            }
        } = request;

        // get renseignement
        const description = await Description.findOne({ observateurId: request.body.observateurId });
        if (description) {
            await Description.updateOne({ observateurId: request.body.observateurId }, { $set: {                 
                marquage : marquage,
                modeDeLevage : modeDeLevage,
                caracteristiques : caracteristiques,
                levageAuxiliaire : levageAuxiliaire,
                detailsLevageAuxiliaire : detailsLevageAuxiliaire,
                modeInstallation : modeInstallation,
                pose : pose,
                suspendu : suspendu,
                surMonorail : surMonorail,
                surPointFixe : surPointFixe,
                surPotence : surPotence,
                surPortique : surPortique,
                autre : autre,
                valueAutre : valueAutre,
                sourceDenergie : sourceDenergie,
                detailSourceDenergie : detailSourceDenergie,
                autreSourceDenergie : autreSourceDenergie,
            } })
            .then((result) => {
                response.status(201).json({ msg: "Modifié avec succès", descriptionId : result._id });
            })
            .catch((error) => {
                console.log(error)
                response.status(400).json(error);
            });

        } else {
            
            await Description({
                marquage : marquage,
                modeDeLevage : modeDeLevage,
                caracteristiques : caracteristiques,
                levageAuxiliaire : levageAuxiliaire,
                detailsLevageAuxiliaire : detailsLevageAuxiliaire,
                modeInstallation : modeInstallation,
                pose : pose,
                suspendu : suspendu,
                surMonorail : surMonorail,
                surPointFixe :surPointFixe,
                surPotence : surPotence,
                surPortique :surPortique,
                autre : autre,
                valueAutre : valueAutre,
                sourceDenergie : sourceDenergie,
                detailSourceDenergie : detailSourceDenergie,
                autreSourceDenergie : autreSourceDenergie,
                observateurId : observateurId
                })
                .save()
                .then(async(result) => {
    
                    await Completed.updateOne({ observateurId: observateurId }, {
                        $set: {
                            description: true,
                        }
                    })
                    .then(() => {
                        response.status(201).json({ msg: "Enregistré avec succès", renseignementId: result._id });
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
        }

    

    } catch (error) {
        console.log(error.message);
        response.status(400).json(error);
    }

}


const select = async (request, response) => {

    try {

        const observateurId = String(request.params.observateurId);
        const description = await Description.findOne({ observateurId : observateurId });
        if(description) {
            const checkEmptyStatus = checkEmpty(description) ;
            console.log(checkEmptyStatus);
            response.status(200).json({ description : description,  checkEmptyStatus : checkEmptyStatus });
        } else {
            response.status(200).json({ description : description,  checkEmptyStatus : false });
        }


    } catch (error) {
        console.log(error)
        response.status(400).json(error);
    }

}


const reset = async (request, response) => {

    try {
        const observateurId = String(request.params.observateurId);
        await Description.deleteOne({ observateurId: observateurId })
            .then(async () => {
                    await Completed.updateOne({ observateurId: observateurId }, {
                        $set: {
                            description: false,
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

export default { create, select, reset }