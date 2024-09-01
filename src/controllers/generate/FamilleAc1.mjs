import { Intervention } from "../../models/intervention.mjs";
import { Inspecteur } from "../../models/inspecteurs.mjs";
import { Observateur } from "../../models/observateur.mjs";
import { Renseignement } from "../../models/accessoire_levage/famille_ac1/renseignement.mjs";
import { Accessoire } from "../../models/accessoire_levage/famille_ac1/accessoire.mjs";
import { Fiche } from "../../models/accessoire_levage/famille_ac1/fiche.mjs";
import { Photo } from "../../models/accessoire_levage/famille_ac1/photo.mjs";
import { Completed } from "../../models/accessoire_levage/famille_ac1/completed.mjs";

import { spawn } from 'child_process';


import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const generate = async (observateurId, inspecteurId, interventionId, type, response) => {

    //check is elements completed
    const completed = await Completed.findOne({ observateurId: observateurId });
    const renseignement = await Renseignement.findOne({ observateurId: observateurId });
    const accessoire = await Accessoire.findOne({ observateurId: observateurId });
    const fiche = await Fiche.findOne({ observateurId: observateurId });
    const photo = await Photo.findOne({ observateurId: observateurId });

    if (completed) {



        if (completed.renseignement == true && completed.accessoire == true && completed.fiche == true && completed.photo == true) {

            const intervention = await Intervention.findById(interventionId);
            const inspecteur = await Inspecteur.findById(inspecteurId);
            const observateur = await Observateur.findById(observateurId);


            const pathFile = path.resolve(__dirname, `../../rapports/output.docx`);
            fs.unlink(pathFile, (err) => {
                if (!err) {
                    console.log('File output docx is deleted.');
                }
            });

            const pathFilePDF = path.resolve(__dirname, `../../rapports/output-tow.pdf`);
            fs.unlink(pathFilePDF, (err) => {
                if (!err) {
                    console.log('File output pdf is deleted.');
                }
            });




            // Load the docx file as binary content
            const content = fs.readFileSync(
                path.resolve(__dirname, `../../rapports/Famille-AC1_VGP.docx`),
                "binary"
            );

            const zip = new PizZip(content);
            const doc = new Docxtemplater(zip, {
                paragraphLoop: true,
                linebreaks: true,
            });

            const items = new Array();
            for (let i = 0; i < accessoire.accessoires.length; i++) {
                items.push({
                    num: i + 1,
                    typeAccessoire: accessoire.accessoires[i]["verfication"],
                    miseArret: accessoire.accessoires[i]["arret"],
                });
            }


            doc.render({

                refClient: "<<PRIVEE>>",
                numeroAffaire: "<<PRIVEE>>",
                numeroRapport: "<<PRIVEE>>",
                annee: new Date().getFullYear(),

                equipement: observateur.equipement,

                adresse: intervention.adresse,
                ville: intervention.ville,
                codePostal: intervention.codePostal,
                pays: intervention.pays,
                etablissement: intervention.etablissement,

                inspecteur: `${inspecteur.nom} ${inspecteur.prenom}`,
                localisation: observateur.localisation,
                dateVerfification: new Date(observateur.date).toLocaleDateString(),
                accompagnateurInspecteur: observateur.accompagnateurInspecteur,

                etablissement: renseignement.etablissement,
                adresse: renseignement.adresse,
                etendueVerification: renseignement.etendueVerification,
                accompagnateurClient: renseignement.accompagnateurClient,
                personneCompteRendu: renseignement.personneCompteRendu,
                nomVerificateur: renseignement.nomVerificateur,
                rapportPrecedent: renseignement.rapportPrecedent,
                datePrecedenteVerification: new Date(renseignement.datePrecedenteVerification).toLocaleDateString(),
                documents: renseignement.documents,
                dateDuree: new Date(renseignement.dateDuree).toLocaleDateString(),

                items: items,

                fiches: fiche.fiches

            });

            const buf = doc.getZip().generate({
                type: "nodebuffer",
                compression: "DEFLATE",
            });


            const flagSuccesWrite = await fs.writeFileSync(pathFile, buf);
            if (flagSuccesWrite == undefined) {

                const executePython = async (script, args) => {

                    const arg = args.map(arg => arg.toString());
                    const py = spawn("python", [script, ...arg]);
                    const result = await new Promise((resolve, reject) => {

                        let output;
                        py.stdout.on("data", (data) => {
                            output = JSON.parse(data);
                        });

                        py.stderr.on("data", (data) => {
                            console.error(`[Python] Error occured :${data}`);
                            reject(`Error accured in ${script}`);
                        });

                        py.on("exit", (code) => {
                            console.error(`child procces exited ith code :${code}`);
                            resolve(output);
                        });

                    });

                    return result;
                }


                try {
                    const result = await executePython('python/script.py', [5, 2]);
                    console.log(result);
                    if (type == "apercu") {
                        const tempFilePath = path.resolve(__dirname, `../../rapports/output-tow.pdf`);
                        var data = fs.readFileSync(tempFilePath);
                        response.contentType("application/pdf");
                        response.send(data);
                    }

                    if (type == "envoyer") {
                        return true;
                    }

                } catch (error) {
                    console.log(error);
                    response.status(500).json({ error: error });
                }

            }

        }

    } else {
        return false;
    }

}

export default { generate }