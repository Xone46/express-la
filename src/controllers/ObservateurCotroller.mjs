
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

        await Observateur(data)
            .save()
            .then(async() => {

                // Load the docx file as binary content
                const content = fs.readFileSync(
                    path.resolve(__dirname, `../rapports/${data.interventionId}.docx`),
                    "binary"
                );

                const zip = new PizZip(content);
                const doc = new Docxtemplater(zip, {
                    paragraphLoop: true,
                    linebreaks: true,
                });

                doc.render({
                    dateVerfication : data.date,
                    interventionId : String(data.interventionId),
                    typeVerification : String(data.typeVerification),
                    categorieAppareil : String(data.categorieAppareil),
                    constructeur : String(data.constructeur),
                    numeroSerie : String(data.numeroSerie),
                    numeroInterne : String(data.numeroInterne),
                    localisation : String(data.localisation),
                    marquage : String(data.marquage),
                    accompagnateur : String(data.accompagnateur)
                });

                const buf = doc.getZip().generate({
                    type: "nodebuffer",
                    compression: "DEFLATE",
                });


                const flagSuccesWrite = await fs.writeFileSync(path.resolve(__dirname, `../rapports/${data.interventionId}.docx`), buf);

                if (flagSuccesWrite == undefined) {
                    response.status(201).json({ msg: "Enregistré avec succès" });
                }
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
        const observateurs = await Observateur.find({ interventionId: observateurId }).sort({ date: -1 });
        if (observateurs == null) {
            return response.status(404).json({ msg: "Il n'y a aucune Appareil(s), équipement(s) ou installation(s)" });
        } else {
            console.log(observateurs)
            return response.status(200).json(observateurs);
        }

    } catch (error) {
        console.log(error)
        response.status(400).json(error);
    }
}

const read = async (request, response) => {
    try {
        return response.status(404).json({ msg: "Il n'y a aucune Appareil(s), équipement(s) ou installation(s) " });
    } catch (error) {
        response.status(400).json(error)
    }
}


const update = async (request, response) => {

}

const deleteOne = async (request, response) => {
    try {

        const result = await Observateur.deleteOne({ _id: request.params.observateurId });
        if (result.acknowledged == true && result.deletedCount == 1) {
            response.status(200).json(true);
        }

    } catch (error) {
        response.status(400).json(error);
    }
}

export default { create, read, update, deleteOne, select }