
import { Intervention } from "../models/intervention.mjs";
import { Observateur } from "../models/observateur.mjs";
import { query, body, validationResult, matchedData, checkSchema } from "express-validator"

import  FamilleAc1_Sup from "../controllers/supprimer/FamilleAc1_Sup.mjs";
import  Famille1_Lev1_Sup from "../controllers/supprimer/Famille1_Lev1_Sup.mjs";
import  Famille2_Lev2_Sup from "../controllers/supprimer/Famille2_Lev2_Sup.mjs";
import  Famille3_Lev3_Sup from "../controllers/supprimer/Famille3_Lev3_Sup.mjs";
import  Famille4_Lev4_Sup from "../controllers/supprimer/Famille4_Lev4_Sup.mjs";


const create = async (request, response) => {

    try {

        const result = validationResult(request);


        if (!result.isEmpty()) {
            const errors = result.errors.map((error) => { return error.msg; })
            return response.status(400).send({ errors: errors });
        }

        const data = matchedData(request);

        await Intervention(data)
            .save()
            .then(async (result) => {
                response.status(200).json(result);
            })
            .catch((error) => {
                response.status(400).json(error);
            });

    } catch (error) {
        console.log(error)
        response.status(400).json(error);
    }

}

const read = async (request, response) => {
    try {

        const interventions = await Intervention.find().sort({ date: -1 });


        if(interventions.length == 0) {
            return response.status(200).json({ msg: "Il n'y a aucune Intervention" });
        } else {
            return response.status(200).json({ interventions : interventions});
        }

    } catch (error) {
        response.status(400).json(error)
    }

}

const update = async (request, response) => {
    const interventionId = String(request.params.interventionsId);
    await Intervention.updateOne({ _id : interventionId }, { $set : request.body })
    .then((result) => {
        response.status(200).json(result);
    })
    .catch((error) => {
        console.log(error);
        response.status(400).json(error);
    })
}

const deleteOne = async (request, response) => {
    try {

        const result = await Intervention.deleteOne({ _id: request.params.interventionId });
        if (result.acknowledged == true && result.deletedCount == 1) {
            
            const observateurs = await Observateur.find({ interventionId: request.params.interventionId });

            for(let i = 0; i < observateurs.length; i++) {

                const observateurId = observateurs[i]._id;

                if (observateurs[i].typeAppareil[0] == "Famille AC1") {
                    FamilleAc1_Sup.supprimer_by_intervention(observateurId);
                }
            
                if(observateurs[i].typeAppareil[0] == "Famille 1 LEV1"){
                    Famille1_Lev1_Sup.supprimer_by_intervention(observateurId);
                }

                if(observateurs[i].typeAppareil[0] == "Famille 2 LEV2"){
                    Famille2_Lev2_Sup.supprimer_by_intervention(observateurId);
                }

                if(observateurs[i].typeAppareil[0] == "Famille 3 LEV3"){
                    Famille3_Lev3_Sup.supprimer_by_intervention(observateurId);
                }

                if(observateurs[i].typeAppareil[0] == "Famille 4 LEV4"){
                    Famille4_Lev4_Sup.supprimer_by_intervention(observateurId);
                }

            }

            await Observateur.deleteMany({ interventionId: request.params.interventionId });
            response.status(200).json(true);
        }

    } catch (error) {
        console.log(error)
        response.status(400).json(error);
    }
}


const select = async (request, response) => {

    try {
        const interventionId = String(request.params.interventionId);
        const intervention = await Intervention.findById(interventionId);
        if(intervention) {
            response.status(200).json(intervention);
        }

    } catch(error) {
        response.status(400).json(error);
    }
}

export default { create, read, update, deleteOne, select }