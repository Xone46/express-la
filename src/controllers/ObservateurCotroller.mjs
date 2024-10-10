// import { Intervention } from "../models/intervention.mjs";
// import { Inspecteur } from "../models/inspecteurs.mjs";
import { Observateur } from "../models/observateur.mjs";

import Accessoire from "./completed/accessoire_levage/completeAccessoire.mjs"
import Appareil from "./completed/appareil_levage/completedAppareil.mjs"

import  FamilleAc1 from "../controllers/generate/FamilleAc1.mjs";
import  Famille1_Lev1 from "../controllers/generate/Famille1_Lev1.mjs";
import  Famille2_Lev2 from "../controllers/generate/Famille2_Lev2.mjs";

import  FamilleAc1_Sup from "../controllers/supprimer/FamilleAc1_Sup.mjs";
import  Famille1_Lev1_Sup from "../controllers/supprimer/Famille1_Lev1_Sup.mjs";
import  Famille2_Lev2_Sup from "../controllers/supprimer/Famille2_Lev2_Sup.mjs";

import  FamilleAc1_Ter from "../controllers/terminer/FamilleAc1_Ter.mjs";
import  Famille1_Lev1_Ter from "../controllers/terminer/Famille1_Lev1_Ter.mjs";
import  Famille2_Lev2_Ter from "../controllers/terminer/Famille2_Lev2_Ter.mjs";


import  FamilleAc1_Env from "./envoyer/accessoire_levage/FamilleAc1_Env.mjs";
import  Famille1_Lev1_Env from "./envoyer/appareil_levage/Famille1_Lev1_Env.mjs";
import  Famille2_Lev2_Env from "./envoyer/appareil_levage/Famille2_Lev2_Env.mjs";
import  Famille3_Lev3_Env from "./envoyer/appareil_levage/Famille3_Lev3_Env.mjs";


import { query, body, validationResult, matchedData, checkSchema } from "express-validator"
import path from "path";
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const apercu = async (request, response) => {

    const observateurId = String(request.params.observateurId);
    const inspecteurId = String(request.params.inspecteurId);
    const obs = await Observateur.findById(observateurId);
    const interventionId = String(obs.interventionId);
    const type = "apercu";

    if (obs.typeAppareil[0] == "Famille AC1") {
        const res = await FamilleAc1.generate(observateurId, inspecteurId, interventionId, type, response);
        if(res == false) {
            response.status(200).json("Nous nous excusons, mais vous n'avez pas complété toutes les étapes");
        }
    }

    if(obs.typeAppareil[0] == "Famille 1 LEV1"){
        const res = await Famille1_Lev1.generate(observateurId, inspecteurId, interventionId, type, response);
        if(res == false) {
            response.status(200).json("Nous nous excusons, mais vous n'avez pas complété toutes les étapes");
        }
    }

    if(obs.typeAppareil[0] == "Famille 2 LEV2"){
        const res = await Famille2_Lev2.generate(observateurId, inspecteurId, interventionId, type, response);
        if(res == false) {
            response.status(200).json("Nous nous excusons, mais vous n'avez pas complété toutes les étapes");
        }
    }

}


const create = async (request, response) => {

    try {

        const result = validationResult(request);

        if (!result.isEmpty()) {
            const errors = result.errors.map((error) => { return error.msg; })
            return response.status(400).send({ errors: errors });
        }

        const data = matchedData(request);
        await Observateur(data)
            .save()
            .then(async (result) => {

                var flag = false;

                flag = data.typeAppareil[0] == 'Famille 1 LEV1' ||
                    data.typeAppareil[0] == 'Famille 2 LEV2' ||
                    data.typeAppareil[0] == 'Famille 3 LEV3' ||
                    data.typeAppareil[0] == 'Famille 4 LEV4' ||
                    data.typeAppareil[0] == 'Famille 5 LEV5';

                if (flag) {
                    Appareil.save(request, response, result._id);
                }

                if (data.typeAppareil[0] == 'Famille AC1') {
                    Accessoire.save(request, response, result._id);
                }

            })
            .catch((error) => {
                console.log(error);
                response.status(400).json(error);
            });

    } catch (error) {
        console.log(error)
        response.status(400).json(error);
    }

}

const select = async (request, response) => {

    try {

        const interventionId = String(request.params.interventionId);
        const observateurs = await Observateur.find({ interventionId: interventionId }).sort({ date: -1 });

        if(observateurs.length == 0) {
            return response.status(200).json({ msg: "Il n'y a aucune Appareil(s), équipement(s) ou installation(s)" });
        } else {
            return response.status(200).json({ observateurs : observateurs });
        }
        
    } catch (error) {
        console.log(error)
        response.status(400).json(error);
    }
}


const selected = async (request, response) => {

    try {

        const observateurId = String(request.params.observateurId);
        const observateur = await Observateur.findById(observateurId);

        if (observateur == null) {
            return response.status(204).json({ msg: "Il n'y a aucune Appareil(s), équipement(s) ou installation(s)" });
        } else {
            return response.status(200).json(observateur);
        }

    } catch (error) {
        console.log(error)
        response.status(400).json(error);
    }
}


const read = async (request, response) => {
    try {

        const observateurs = await Observateur.find();

        if (observateurs) {
            return response.status(200).json(observateurs);
        } else {
            return response.status(404).json({ msg: "Il n'y a aucune Appareil(s), équipement(s) ou installation(s) " });
        }

    } catch (error) {
        response.status(400).json(error)
    }
}


const readTerminer = async (request, response) => {
    try {

        const observateurs = await Observateur.find({ etat: true });

        if (observateurs) {
            return response.status(200).json(observateurs);
        } else {
            return response.status(404).json({ msg: "Il n'y a aucune Appareil(s), équipement(s) ou installation(s) " });
        }

    } catch (error) {
        response.status(400).json(error)
    }
}


const update = async (request, response) => {
    const observateurId = String(request.params.observateurId);
    try {

        await Observateur.updateOne({ _id: observateurId }, { $set: request.body })
            .then(() => {
                response.status(201).json({ msg: "Modifié avec succès" });
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

const terminer = async (request, response) => {

    const observateurId = String(request.params.observateurId);
    const obs = await Observateur.findById(observateurId);

    if (obs.typeAppareil[0] == "Famille AC1") {
        FamilleAc1_Ter.terminer(observateurId, response);
    }

    if(obs.typeAppareil[0] == "Famille 1 LEV1"){
        Famille1_Lev1_Ter.terminer(observateurId, response);
    }

    if(obs.typeAppareil[0] == "Famille 2 LEV2"){
        Famille2_Lev2_Ter.terminer(observateurId, response);
    }

}


const cacher = async (request, response) => {

    const observateurId = String(request.params.observateurId);
    const observateur = await Observateur.findById(observateurId);

    if(observateur.etat == true) {

        await Observateur.updateOne({ _id: observateurId }, { $set: { cache: true } })
            .then(() => {
                response.status(201).json({ msg: true });
            })
            .catch((error) => {
                console.log(error)
                response.status(400).json(error);
            });
    }

    if(observateur.etat == false) {
        response.status(200).json({ msg: false , content : "Nous nous excusons, mais vous n'avez pas terminé de remplir toutes les étapes et d'appuyer sur un bouton Je termine" })
    }

}



const deleteOne = async (request, response) => {

    try {

        const observateurId = String(request.params.observateurId)
        const obs = await Observateur.findById(observateurId);
    
        if (obs.typeAppareil[0] == "Famille AC1") {
            FamilleAc1_Sup.supprimer(observateurId, response);
        }
    
        if(obs.typeAppareil[0] == "Famille 1 LEV1"){
            Famille1_Lev1_Sup.supprimer(observateurId, response);
        }

        if(obs.typeAppareil[0] == "Famille 2 LEV2"){
            Famille2_Lev2_Sup.supprimer(observateurId, response);
        }
    
    } catch (error) {
        console.log(error)
        response.status(400).json(error);
    }
}



const envoyer = async (request, response) => {

    try {

        const observateurId = String(request.params.observateurId);
        const inspecteurId = String(request.params.inspecteurId);
        const ip = request.params.ip;
        const interventionId = request.params.interventionId;
        const type = "envoyer";

        const obs = await Observateur.findById(observateurId);

        if (obs.typeAppareil[0] == "Famille AC1") {

            const flag = FamilleAc1.generate(observateurId, inspecteurId, interventionId, type, response);

            if(flag) {
                FamilleAc1_Env.envoyer(observateurId, inspecteurId, ip, response);
            }
        }
    
        if(obs.typeAppareil[0] == "Famille 1 LEV1") {

            const flag = Famille1_Lev1.generate(observateurId, inspecteurId, interventionId, type, response);

            if(flag) {
                Famille1_Lev1_Env.envoyer(observateurId, inspecteurId, ip, response);
            }
        }

        if(obs.typeAppareil[0] == "Famille 2 LEV2") {

            const flag = Famille1_Lev1.generate(observateurId, inspecteurId, interventionId, type, response);

            if(flag) {
                Famille2_Lev2_Env.envoyer(observateurId, inspecteurId, ip, response);
            }
        }
        
        if(obs.typeAppareil[0] == "Famille 3 LEV3") {

            const flag = Famille3_Lev3.generate(observateurId, inspecteurId, interventionId, type, response);

            if(flag) {
                Famille3_Lev3_Env.envoyer(observateurId, inspecteurId, ip, response);
            }
        }


    } catch(error) {
        console.log(error.message)
        response.status(400).json(error)
    }


}

export default { create, read, update, deleteOne, select, apercu, selected, envoyer, terminer, cacher, readTerminer }