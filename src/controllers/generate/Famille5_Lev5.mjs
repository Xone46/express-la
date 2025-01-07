import { Intervention } from "../../models/intervention.mjs";
import { Inspecteur } from "../../models/inspecteurs.mjs";
import { Observateur } from "../../models/observateur.mjs";
import { RenseignementFamilleFiveLevFive } from "../../models/appareil_levage/famille5_lev5/renseignement.mjs";
import { ExamenFamilleFiveLevFive } from "../../models/appareil_levage/famille5_lev5/examen.mjs";
import { DescriptionFamilleFiveLevFive } from "../../models/appareil_levage/famille5_lev5/description.mjs";
import { ConclusionFamilleFiveLevFive } from "../../models/appareil_levage/famille5_lev5/conclusion.mjs";
import { PhotoFamilleFiveLevFive } from "../../models/appareil_levage/famille5_lev5/photo.mjs";
import { Commentaire } from "../../models/commentaire.mjs";
import { CompletedFamilleFiveLevFive } from "../../models/appareil_levage/famille5_lev5/completed.mjs";
import { spawn } from 'child_process';


import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import ImageModule from 'docxtemplater-image-module-free';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const generate = async (observateurId, inspecteurId, interventionId, type, response) => {

    //check is elements completed
    const completed = await CompletedFamilleFiveLevFive.findOne({ observateurId: observateurId });
    const renseignement = await RenseignementFamilleFiveLevFive.findOne({ observateurId: observateurId });
    const description = await DescriptionFamilleFiveLevFive.findOne({ observateurId: observateurId });
    const examen = await ExamenFamilleFiveLevFive.findOne({ observateurId: observateurId });
    const conclusion = await ConclusionFamilleFiveLevFive.findOne({ observateurId: observateurId });
    const photo = await PhotoFamilleFiveLevFive.findOne({ observateurId: observateurId });
    const comments = await Commentaire.find({ observateurId: observateurId });


    if (completed) {

        if (completed.renseignement == true && completed.description == true && completed.examen == true && completed.conclusion == true && completed.photo == true) {

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

            if (a != "") {
                observations.push({
                    content: a,
                    child: conclusion.child
                })
            }

            if (b != "") {
                observations.push({
                    content: b
                })
            }

            if (c != "") {
                observations.push({
                    content: c
                })
            }
            if (d != "") {
                consclusions.push({
                    content: d
                })
            }

            if (e != "") {
                consclusions.push({
                    content: e
                })
            }

            if (f != "") {
                consclusions.push({
                    content: f
                })
            }

            if (g != "") {
                consclusions.push({
                    content: g
                })
            }

            // commentaire
            const arr_obs = new Array();
            const cri = new Array();
            const ncri = new Array();

            if (comments) {

                let k = 0;

                for (let i = 0; i < comments.length; i++) {
                    for (let j = 0; j < comments[i].modelSelected.length; j++) {
                        arr_obs.push({
                            text: comments[i].modelSelected[j].name,
                            status: comments[i].modelSelected[j].status,
                            ref: comments[i].ref,
                            number: comments[i].number,
                            obs: `O${k}`
                        });

                        k++;
                    }
                }

                for (let i = 0; i < arr_obs.length; i++) {

                    if (arr_obs[i].status == "non critique") {
                        ncri.push({
                            text: arr_obs[i].text,
                            status: arr_obs[i].status,
                            ref: arr_obs[i].ref,
                            number: arr_obs[i].number,
                            obs: arr_obs[i].obs
                        })
                    }

                    if (arr_obs[i].status == "critique") {
                        cri.push({
                            text: arr_obs[i].text,
                            status: arr_obs[i].status,
                            ref: arr_obs[i].ref,
                            number: arr_obs[i].number,
                            obs: arr_obs[i].obs
                        })
                    }

                }

            }



            // Examen
            const fixDuplicateExamen = (arr, val) => {

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

                        console.log(val)
                        const somme_obs = new Array();
                        for (let k = 0; k < arr_obs.length; k++) {
                            if (arr_obs[k].ref == val) {
                                somme_obs.push(arr_obs[k].obs)
                            }
                        }

                        arr[i].avis.push(somme_obs.toString());
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

            var opts = {}
            opts.centered = false; //Set to true to always center images
            opts.fileType = "docx"; //Or pptx

            //Pass your image loader
            opts.getImage = function (tagValue, tagName) {
                if(tagName == "image") {
                    return fs.readFileSync(path.resolve(__dirname, `../../uploads/${tagValue}`), "binary");
                }
            }

            //Pass the function that return image size
            opts.getSize = function (img, tagValue, tagName) {
                return [300, 280];
            }

            const tagValue = photo.filename;
            const tagName = `image`;

            opts.getImage(tagValue, tagName);
            opts.getSize(opts.getImage(), tagValue, tagName);

            var imageModule = new ImageModule(opts);

            // Load the docx file as binary content
            const content = fs.readFileSync(
                path.resolve(__dirname, `../../rapports/Famille5-LEV5_VGP.docx`),
                "binary"
            );

            const zip = new PizZip(content);
            var doc = new Docxtemplater()
                .attachModule(imageModule)
                .loadZip(zip)
                .setData({

                    image: tagValue,

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
                    numeroSerie: observateur.numeroSerie,
                    localisation: observateur.localisation,
                    dateVerification: new Date(observateur.date).toLocaleDateString(),
                    inspecteur: `${inspecteur.nom} ${inspecteur.prenom}`,
                    accompagnateurInspecteur: observateur.accompagnateurInspecteur,
                    dateEmission: new Date().toLocaleDateString(),
                    pages: "9",

                    typeConstructeur: renseignement.typeConstructeur,
                    anneeMiseService: renseignement.anneeMiseService,
                    numeroInterne: (renseignement.numeroInterne == "Avec Objet : ") ? renseignement.suiveNumeroInterne : "Sans Objet",
                    typeAppareil: renseignement.typeAppareil,
                    suiveTypeAppareil: renseignement.suiveTypeAppareil,
                    typeVerification: renseignement.typeVerification,
                    suiveTypeVerification : renseignement.suiveTypeVerification,
                    documentationTechniqueConstructeur : renseignement.documentationTechniqueConstructeur,
                    epreuves : renseignement.epreuves,
                    essaischarge : renseignement.essaischarge,
                    suiveEssaischarge : renseignement.suiveEssaischarge,
                    examenMontageInstallation : renseignement.examenMontageInstallation,
                    modification : renseignement.modification,
                    suiveModification : renseignement.suiveModification,


                    marquage: description.marquage,
                    chargeMaximaleUtile: description.chargeMaximaleUtile,
                    hauteurLeveeMaximale: description.hauteurLeveeMaximale,
                    levage: description.levage,
                    sourceEnergie: description.sourceEnergie,
                    dispositifElevation: description.dispositifElevation,
                    transmissionElevation: description.transmissionElevation,
                    nombreChainesCables: description.nombreChainesCables,
                    chargeRupture: description.chargeRupture,
                    coefficientUtilisation: description.coefficientUtilisation,
                    organesSuspension: description.organesSuspension,
                    supoprtCharge: description.supoprtCharge,
                    levageAuxiliaire: description.levageAuxiliaire,

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

                    observations: observations,
                    consclusions: consclusions

                })
                .render();


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

        } else {
            return false;
        }

    }

}

export default { generate }