
import { Observateur } from "../models/observateur.mjs";
import { Renseignement } from "../models/renseignement.mjs";
import { Examen } from "../models/examen.mjs";
import { Description } from "../models/description.mjs";
import { Conclusion } from "../models/conclusion.mjs";
import { Photo } from "../models/photo.mjs";
import docxConverter from 'docx-pdf';
import convert from 'node-convert';
import conversion from '@groupdocs/groupdocs.conversion';






import { query, body, validationResult, matchedData, checkSchema } from "express-validator"
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { request } from "http";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const apercu = async (request, response) => {

    const observateurId = String(request.params.observateurId);
    const observateur = await Observateur.findById(observateurId);
    console.log(observateur)
    const renseignement = await Renseignement.findOne({ observateurId : observateurId});
    console.log(renseignement)
    const examen = await Examen.findOne({ observateurId : observateurId });
    console.log(examen)
    const description = await Description.findOne({ observateurId : observateurId });
    console.log(description)
    const conclusion = await Conclusion.findOne({ observateurId : observateurId });
    console.log(conclusion)
    const photo = await Photo.findOne({ observateurId : observateurId });

    const pathFile = path.resolve(__dirname, `../rapports/${observateur.interventionId}.docx`);
    fs.unlink(pathFile, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log('File is deleted.');
    }
    });


    // Load the docx file as binary content
    const content = fs.readFileSync(
        path.resolve(__dirname, `../rapports/input.docx`),
        "binary"
    );

    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
    });


    doc.render({

        categorieAppareil: String(observateur.categorieAppareil),
        constructeur: String(observateur.constructeur),
        date: String(observateur.date),
        interventionId: String(observateur.interventionId),
        localisation: String(observateur.localisation),
        marquage: String(observateur.marquage),
        numeroInterne: String(observateur.numeroInterne),
        numeroSerie: String(observateur.numeroSerie),
        typeVerification: String(observateur.typeVerification),
        accompagnateur: String(observateur.accompagnateur),


        // typeConstructeur: String(renseignement.typeConstructeur),
        // anneeMiseService: String(renseignement.anneeMiseService),
        // numeroSerieRenseignement: String(renseignement.numeroSerie),
        // numeroInterneRenseignement: String(renseignement.numeroInterne),
        // valueNumeroInterne: String(renseignement.valueNumeroInterne),
        // localisationRenseignement: String(renseignement.localisation),
        // typeAppareil: String(renseignement.typeAppareil),
        // modification: String(renseignement.modification),
        // description: String(renseignement.description),
        // essaischarge: String(renseignement.essaischarge),
        // miseEnService: String(renseignement.miseEnService),
        // epreuvemMiseEnService: String(renseignement.epreuvemMiseEnService),
        // dateDerniereVerficationPeriodique: String(renseignement.dateDerniereVerficationPeriodique),
        // realiseesMiseEnService: String(renseignement.realiseesMiseEnService),
        // epreuveDateDerniereVerficationPeriodique: String(renseignement.epreuveDateDerniereVerficationPeriodique),
        // realiseesDateDerniereVerficationPeriodique: String(renseignement.realiseesDateDerniereVerficationPeriodique),
        // poidsKg: String(renseignement.poidsKg),


    });

    const buf = doc.getZip().generate({
        type: "nodebuffer",
        compression: "DEFLATE",
    });


    const flagSuccesWrite = await fs.writeFileSync(pathFile, buf);

    if (flagSuccesWrite == undefined) {

        // Load the input DOCX file
        const converter = new conversion.Converter(pathFile);

        // Set the conversion options for PDF format
        const options = new conversion.PdfConvertOptions();

        // Save output PDF to disk
        converter.convert("output.pdf", options);

        response.status(201).json({ msg: "Enregistré avec succès" });
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
            .then(async () => {
                response.status(201).json({ msg: "Enregistré avec succès" });
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
            return response.status(404).json({ msg: "Il n'y a aucune Appareil(s), équipement(s) ou installation(s)ult" });
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

export default { create, read, update, deleteOne, select, apercu }