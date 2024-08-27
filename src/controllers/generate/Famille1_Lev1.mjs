import { Intervention } from "../../models/intervention.mjs";
import { Inspecteur } from "../../models/inspecteurs.mjs";
import { Observateur } from "../../models/observateur.mjs";
import { Renseignement } from "../../models/appareil_levage/famille1_lev1/renseignement.mjs";
import { Examen } from "../../models/appareil_levage/famille1_lev1/examen.mjs";
import { Description } from "../../models/appareil_levage/famille1_lev1/description.mjs";
import { Conclusion } from "../../models/appareil_levage/famille1_lev1/conclusion.mjs";
import { Photo } from "../../models/appareil_levage/famille1_lev1/photo.mjs";
import { Commentaire } from "../../models/appareil_levage/famille1_lev1/commentaire.mjs";
import { spawn } from 'child_process';


import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const generate = async (observateurId, inspecteurId, interventionId, response) => {

    //check is elements completed
    const renseignement = await Renseignement.findOne({ observateurId: observateurId });
    const description = await Description.findOne({ observateurId: observateurId });
    const examen = await Examen.findOne({ observateurId: observateurId });
    const conclusion = await Conclusion.findOne({ observateurId: observateurId });
    const photo = await Photo.findOne({ observateurId: observateurId });
    const comment = await Commentaire.findOne({ observateurId: observateurId });


    if (renseignement.length === 0 || description.length === 0 || examen.length === 0 || conclusion.length === 0) {
        console.log(false);
    } else {

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

        // consclusion

        const a = String(conclusion.a);
        const b = String(conclusion.b);
        const c = String(conclusion.c);
        const d = String(conclusion.d);
        const e = String(conclusion.e);
        const f = String(conclusion.f);
        const g = String(conclusion.g);


        const observations = new Array();
        const consclusions = new Array();

        if(a != "") {
            observations.push({
                content : a,
                child :conclusion.child
            })
        }

        if(b != "") {
            observations.push({
                content : b
            })
        }

        if(c != "") {
            observations.push({
                content : c
            })
        }
        if(d != "") {
            consclusions.push({
                content : d
            })
        }

        if(e != "") {
            consclusions.push({
                content : e
            })
        }

        if(f != "") {
            consclusions.push({
                content : f
            })
        }

        if(g != "") {
            consclusions.push({
                content : g
            })
        }



        // commentaire
        const cri = new Array();
        const ncri = new Array();

        if (comment) {
            for (let i = 0; i < comment.length; i++) {
                for (let j = 0; j < comment[i].modelSelected.length; j++) {
                    if (comment[i].modelSelected[j].status == "critique") {

                        cri.push({
                            ref: `${comment[i].ref}${comment[i].number}`,
                            tab: comment[i].modelSelected[j].name
                        });
                    }
                    if (comment[i].modelSelected[j].status == "non critique") {

                        ncri.push({
                            ref: `${comment[i].ref}${comment[i].number}`,
                            tab: comment[i].modelSelected[j].name
                        });
                    }
                }
            }
        }

        // Examen
        const fixDuplicateExamen = (arr, obs) => {

            for (let i = 0; i < arr.length; i++) {
                // create array inside Object
                arr[i].avis = [];

                if (arr[i].be == false) {
                    delete arr[i].be;
                } else {
                    arr[i].avis.push("BE");
                }

                if (arr[i].fc == false) {
                    delete arr[i].fc;
                } else {
                    arr[i].avis.push("FC");
                }

                if (arr[i].sa == false) {
                    delete arr[i].sa;
                } else {
                    arr[i].avis.push("SA");
                }

                if (arr[i].so == false) {
                    delete arr[i].so;
                } else {
                    arr[i].avis.push("SO");
                }

                if (arr[i].o == false) {
                    delete arr[i].o;
                } else {
                    arr[i].avis.push(`Observation numéro : ${obs}${i}`);
                }

                if (arr[i].nv == false) {
                    delete arr[i].nv;
                } else {
                    arr[i].avis.push("NV")
                }

                arr[i].avis = arr[i].avis.join();
            }

            return arr;
        };

        const aExamen = fixDuplicateExamen(examen.a, "A");
        const bExamen = fixDuplicateExamen(examen.b, "B");
        const cExamen = fixDuplicateExamen(examen.c, "C");
        const dExamen = fixDuplicateExamen(examen.d, "D");
        const eExamen = fixDuplicateExamen(examen.e, "E");
        const fExamen = fixDuplicateExamen(examen.f, "F");
        const gExamen = fixDuplicateExamen(examen.g, "G");
        const hExamen = fixDuplicateExamen(examen.h, "H");
        const iExamen = fixDuplicateExamen(examen.i, "I");
        const jExamen = fixDuplicateExamen(examen.j, "J");



        // Load the docx file as binary content
        const content = fs.readFileSync(
            path.resolve(__dirname, `../../rapports/Famille1-LEV1_VGP.docx`),
            "binary"
        );

        const zip = new PizZip(content);
        const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
        });


        doc.render({

            refClient: "<<PRIVEE>>",
            numeroAffaire: "<<PRIVEE>>",
            numeroRapport: "<<PRIVEE>>",
            annee: new Date().getFullYear(),

            etablissement: intervention.etablissement,
            adresse: intervention.adresse,
            codePostal: intervention.codePostal,
            ville: intervention.ville,
            pays: intervention.pays,

            equipement: observateur.equipement,

            constructeur: observateur.constructeur,
            marquage: observateur.marquage,
            typeVerification: observateur.typeVerification,
            numeroSerie: observateur.numeroSerie,
            localisation: observateur.localisation,
            dateVerification: new Date(observateur.date).toLocaleDateString(),
            inspecteur: `${inspecteur.nom} ${inspecteur.prenom}`,
            accompagnateurInspecteur: observateur.accompagnateurInspecteur,
            dateEmission: new Date().toLocaleDateString(),
            pages : "XXX",


            typeConstructeur : renseignement.typeConstructeur,
            anneeMiseService : renseignement.anneeMiseService,
            localisation : renseignement.localisation,
            numeroInterne : (renseignement.numeroInterne == "Avec Objet : ") ? renseignement.suiveNumeroInterne : "Sans Objet",
            typeAppareil : renseignement.typeAppareil,
            suiveTypeAppareil : renseignement.suiveTypeAppareil,
            miseEnServiceRapport : renseignement.miseEnServiceRapport,
            miseEnServiceEpreuves : renseignement.miseEnServiceEpreuves,
            suiveMiseEnServiceEpreuves : renseignement.suiveMiseEnServiceEpreuves,
            dateDerniereVerficationPeriodique : renseignement.dateDerniereVerficationPeriodique,
            suiveDateDerniereVerficationPeriodique : renseignement.suiveDateDerniereVerficationPeriodique,
            rapport : renseignement.rapport,
            essaischarge : renseignement.essaischarge,
            suiveEssaischarge : renseignement.suiveEssaischarge,
            modification : renseignement.modification,
            suiveModification : renseignement.suiveModification,

            marquage : description.marquage,
            chargeMaximaleUtile : description.chargeMaximaleUtile,
            porteeMinimale : description.porteeMinimale,
            distanceCentreGravite : description.distanceCentreGravite,
            course : description.course,
            hauteurLevage : description.hauteurLevage,
            portee : description.portee,
            porteFauxDeport : description.porteFauxDeport,
            longueurCheminRoulement : description.longueurCheminRoulement,
            dimensionPlateau : description.dimensionPlateau,
            modeInstallation : description.modeInstallation,
            suiveModeInstallation : description.suiveModeInstallation,
            mecanisme : description.mecanisme,
            suiveMecanisme : description.suiveMecanisme,

            hasCable : description.suspentes[0]["hasCable"],
            cable : description.suspentes[0]["cable"],
            detailsCable : description.suspentes[0]["detailsCable"],

            hasChaineRouleau : description.suspentes[0]["hasChaineRouleau"],
            chaineRouleau : description.suspentes[0]["chaineRouleau"],
            detailsChaineRouleau : description.suspentes[0]["detailsChaineRouleau"],

            hasChaineMaillons: description.suspentes[0]["hasChaineMaillons"],
            chaineMaillons: description.suspentes[0]["chaineMaillons"],
            detailsChaineMaillons: description.suspentes[0]["detailsChaineMaillons"],

            hasSangle: description.suspentes[0]["hasSangle"],
            sangle: description.suspentes[0]["sangle"],
            detailsSangle: description.suspentes[0]["detailsSangle"],

            aExamen: aExamen,
            bExamen: bExamen,
            cExamen: cExamen,
            dExamen: dExamen,
            eExamen: eExamen,
            fExamen: fExamen,
            gExamen: gExamen,
            hExamen: hExamen,
            iExamen: iExamen,
            jExamen: jExamen,

            cri: cri,
            ncri: ncri,

            observations : observations,
            consclusions : consclusions

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
                const tempFilePath = path.resolve(__dirname, `../../rapports/output-tow.pdf`);
                var data = fs.readFileSync(tempFilePath);
                response.contentType("application/pdf");
                response.send(data);

            } catch (error) {
                console.log(error);
                response.status(500).json({ error: error });
            }

        }

    }

}

export default { generate }