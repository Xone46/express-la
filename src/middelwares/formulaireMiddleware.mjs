import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const formulaireMiddleware = async (request, response, next) => {

    try {

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
            date: request.body.date,
            annee : new Date(request.body.date).getFullYear(),
            numeroAffaire: request.body.numeroAffaire,
            site: request.body.site,
            etablissement: request.body.etablissement,
            repere: request.body.repere,
            adresse: request.body.adresse,
            codePostal: request.body.codePostal,
            ville: request.body.ville,
            metier: request.body.metier,
            pays: request.body.pays
        });

        const buf = doc.getZip().generate({
            type: "nodebuffer",
            compression: "DEFLATE",
        });


        const flagSuccesWrite = await fs.writeFileSync(path.resolve(__dirname, `../rapports/output.docx`), buf);

        if (flagSuccesWrite == undefined) {
            response.status(201).json({ msg: "Enregistré avec succès" });
        }

        next();

    } catch (error) {
        response.status(400).json(error)
    }

}