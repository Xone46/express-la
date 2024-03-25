
import { Intervention } from "../models/intervention.mjs";
import { Observateur } from "../models/observateur.mjs";
import { query, body, validationResult, matchedData, checkSchema } from "express-validator"
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

                // Load the docx file as binary content
                const content = fs.readFileSync(
                    path.resolve(__dirname, "../rapports/input.docx"),
                    "binary"
                );

                const zip = new PizZip(content);

                const doc = new Docxtemplater(zip, {
                    paragraphLoop: true,
                    linebreaks: true,
                });

                doc.render({
                    date: data.date,
                    annee: new Date(data.date).getFullYear(),
                    numeroAffaire: data.numeroAffaire,
                    site: data.site,
                    etablissement: data.etablissement,
                    repere: data.repere,
                    adresse: data.adresse,
                    codePostal: data.codePostal,
                    ville: data.ville,
                    metier: data.metier,
                    pays: data.pays
                });

                const buf = doc.getZip().generate({
                    type: "nodebuffer",
                    compression: "DEFLATE",
                });

                const nameFile = String(result._id);
                const flagSuccesWrite = await fs.writeFileSync(path.resolve(__dirname, `../rapports/${nameFile}.docx`), buf);

                if(flagSuccesWrite == undefined) {
                    response.status(201).json({ msg: "Enregistré avec succès" });
                }
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
        const interventions = await Intervention.find().sort({ date: 1 });

        if (interventions.length === 0) {
            return response.status(404).json({ msg: "Il n'y a aucune Intervention" });
        } else {
            return response.status(200).json(interventions);
        }

    } catch (error) {
        response.status(400).json(error)
    }
}

const update = async (request, response) => {

}

const deleteOne = async (request, response) => {
    try {
        const result = await Intervention.deleteOne({ _id: request.params.interventionId });
        if (result.acknowledged == true && result.deletedCount == 1) {
            await Observateur.deleteMany({ interventionId: request.params.interventionId });
            response.status(200).json(true);
        }

    } catch (error) {
        console.log(error)
        response.status(400).json(error);
    }
}

export default { create, read, update, deleteOne }