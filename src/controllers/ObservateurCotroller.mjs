import { Intervention } from "../models/intervention.mjs";
import { Inspecteur } from "../models/inspecteurs.mjs";
import { Observateur } from "../models/observateur.mjs";
import { Renseignement } from "../models/appareil_levage/famille1_lev1/renseignement.mjs";
import { Examen } from "../models/appareil_levage/famille1_lev1/examen.mjs";
import { Description } from "../models/appareil_levage/famille1_lev1/description.mjs";
import { Conclusion } from "../models/appareil_levage/famille1_lev1/conclusion.mjs";
import { Photo } from "../models/appareil_levage/famille1_lev1/photo.mjs";
import { Commentaire } from "../models/appareil_levage/famille1_lev1/commentaire.mjs";
import Accessoire from "./completed/accessoire_levage/completeAccessoire.mjs"
import Appareil from "./completed/appareil_levage/completedAppareil.mjs"

import { spawn } from 'child_process';
import geoip from 'geoip-lite'

const EMAIL = process.env.EMAIL
const CLIENT_ID = process.env.CLIENT_ID
const SECRET_ID = process.env.SECRET_ID
const REFRESH_TOKEN = process.env.REFRESH_TOKEN

import nodemailer from "nodemailer";
import handlebars from "handlebars";
import { google } from "googleapis";



import { query, body, validationResult, matchedData, checkSchema } from "express-validator"
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import ImageModule from "docxtemplater-image-module-free";



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const apercu = async (request, response) => {

    const observateurId = String(request.params.observateurId);
    const obs = await Observateur.findById(observateurId);
    const interventionId = String(obs.interventionId);
    const inspecteurId = String(request.params.inspecteurId);

    //check is elements completed
    const completedRenseignement = await Renseignement.find({ observateurId: observateurId });
    const completedDescription = await Description.find({ observateurId: observateurId });
    const completedExamen = await Examen.find({ observateurId: observateurId });
    const completedConclusion = await Conclusion.find({ observateurId: observateurId });
    const completedPhoto = await Photo.find({ observateurId: observateurId });


    if (completedRenseignement.length === 0 || completedExamen.length === 0 || completedDescription.length === 0 || completedConclusion.length === 0 || completedPhoto.length === 0) {
        console.log(false);
    } else {

        const intervention = await Intervention.findById(interventionId);
        // console.log(intervention);
        const inspecteur = await Inspecteur.findById(inspecteurId);
        // console.log(inspecteur);
        const observateur = await Observateur.findById(observateurId);
        // console.log(description.levageAuxiliaire[0]);

        const pathFile = path.resolve(__dirname, `../rapports/output.docx`);
        fs.unlink(pathFile, (err) => {
            if (!err) {
                console.log('File output docx is deleted.');
            }
        });

        const pathFilePDF = path.resolve(__dirname, `../rapports/output-tow.pdf`);
        fs.unlink(pathFilePDF, (err) => {
            if (!err) {
                console.log('File output pdf is deleted.');
            }
        });

        const renseignement = await Renseignement.findOne({ observateurId: observateurId });
        // console.log(renseignement);

        const examen = await Examen.findOne({ observateurId: observateurId });
        // console.log(examen);

        const description = await Description.findOne({ observateurId: observateurId });

        // create Object for filter modInstallationDetails
        let valueModeInstallationDetails = null;
        const obModeInstallationDetails = {
            pose: description.pose,
            suspendu: description.suspendu,
            surMonorail: description.surMonorail,
            surPointFixe: description.surPointFixe,
            surPotence: description.surPotence,
            surPortique: description.surPortique,
            autre: description.autre,
            valueAutre: description.valueAutre
        }

        for (const [key, value] of Object.entries(obModeInstallationDetails)) {
            if (value == null || value == "") {
                delete obModeInstallationDetails[key]
            } else {
                valueModeInstallationDetails = obModeInstallationDetails[key];
            }
        }


        const conclusion = await Conclusion.findOne({ observateurId: observateurId });


        const a = String(conclusion.a);
        const b = String(conclusion.b);
        const c = String(conclusion.c);
        const d = String(conclusion.d);
        const e = String(conclusion.e);
        const f = String(conclusion.f);
        const g = String(conclusion.g);
        const poids = String(conclusion.poids);
        const commentaire = String(conclusion.commentaire);

        const photo = await Photo.findOne({ observateurId: observateurId });

        const imageOptions = {
            centered: false,
            getImage(tagValue, tagName, meta) {
                return fs.readFileSync(__dirname + '../uploads/1712154000684.jpg');
            },
            getSize() {
                // it also is possible to return a size in centimeters, like this : return [ "2cm", "3cm" ];
                return [150, 150];
            },
        };




        const cri = new Array();
        const ncri = new Array();

        const comment = await Commentaire.find({ observateurId: observateurId });

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
        const kExamen = fixDuplicateExamen(examen.k, "K");

        // Load the docx file as binary content
        const content = fs.readFileSync(
            path.resolve(__dirname, `../rapports/input.docx`),
            "binary"
        );

        const zip = new PizZip(content);
        const doc = new Docxtemplater(zip, {
            modules: [new ImageModule(imageOptions)],
            paragraphLoop: true,
            linebreaks: true,
        });

        doc.render({
            // Partie On
            refClient: "<<G-T-H-X-P-R>>",
            numeroAffaire: "<<G-T-H-X-P-R>>",
            numeroRapport: "<<G-T-H-X-P-R>>",
            annee: new Date().getFullYear(),

            //Partie Tow
            equipement: observateur.equipement,
            categorieAppareil: observateur.categorieAppareil,
            etablissement: intervention.etablissement,
            adresse: intervention.adresse,
            codePostal: intervention.codePostal,
            ville: intervention.ville,
            pays: intervention.pays,

            // Partie Tree
            constructeur: observateur.constructeur,
            marquage: observateur.marquage,
            typeVerification: observateur.typeVerification,
            numeroSerie: observateur.numeroSerie,
            localisation: observateur.localisation,
            dateVerfication: new Date(observateur.date).toLocaleDateString(),
            inspecteur: `${inspecteur.nom} ${inspecteur.prenom}`,
            accompagnateur: observateur.accompagnateur,
            dateEmission: new Date().toLocaleDateString(),

            //Partie Four
            typeConstructeur: renseignement.typeConstructeur,
            anneeMiseService: renseignement.anneeMiseService,
            numeroSerieRenseignement: renseignement.numeroSerie,
            numeroInterneRenseignement: renseignement.numeroInterne,
            numeroInterneAutre: renseignement.numeroInterneAutre,
            localistationRenseignement: renseignement.localisation,
            typeAppareil: renseignement.typeAppareil,
            typeAppareilAutre: renseignement.typeAppareilAutre,
            miseEnServiceRapport: renseignement.miseEnServiceRapport,
            miseEnServiceEpreuves: renseignement.miseEnServiceEpreuves,
            miseEnServiceEpreuvesAutre: renseignement.miseEnServiceEpreuvesAutre,
            dateDerniereVerficationPeriodique: renseignement.dateDerniereVerficationPeriodique,
            dateDerniereVerficationPeriodiqueAutre: renseignement.dateDerniereVerficationPeriodiqueAutre,
            dateDerniereVerficationPeriodiqueRapport: renseignement.dateDerniereVerficationPeriodiqueRapport,
            essaischarge: renseignement.essaischarge,
            essaischargeAutre: renseignement.essaischargeAutre,
            modification: renseignement.modification,
            modificationAutre: renseignement.modificationAutre,

            // Partie Five
            marquage: description.marquage,
            modeDeLevage: description.modeDeLevage,
            chargeMaximaleUtile: description.caracteristiques[0].chargeMaximaleUtile,
            hauteurDeLevage: description.caracteristiques[0].hauteurDeLevage,
            portee: description.caracteristiques[0].portee,
            porteFaux: description.caracteristiques[0].porteFaux,
            longueurDuCheminDeRoulement: description.caracteristiques[0].longueurDuCheminDeRoulement,
            suspentes: description.caracteristiques[0].suspentes,
            suspentesAutre: description.caracteristiques[0].suspentesAutre,
            mouflage: description.caracteristiques[0].mouflage,
            diametre: description.caracteristiques[0].diametre,

            sansObjet: description.levageAuxiliaire,
            chargeMaximale: description.detailsLevageAuxiliaire[0].chargeMaximaleUtileDeChaquePalan,
            suspentesL: description.detailsLevageAuxiliaire[0].suspentes,
            suspentesAutreL: description.caracteristiques[0].suspentesAutre,
            mouflageLevage: description.detailsLevageAuxiliaire[0].mouflage,
            diametreLevage: description.detailsLevageAuxiliaire[0].diametre,
            modeInstallation: description.modeInstallation,
            modeInstallationDetails: valueModeInstallationDetails,
            sourceEnergie: !description.autreSourceDenergie ? description.sourceDenergie : description.autreSourceDenergie,
            detailSourceDenergie: description.detailSourceDenergie,


            //Partie Six
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
            kExamen: kExamen,

            //Partie seven
            a: a,
            b: b,
            c: c,
            d: d,
            e: e,
            f: f,
            g: g,
            poids: poids,
            commentaire: commentaire,

            //Partie Eight
            cri: cri,
            ncri: ncri
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
                const tempFilePath = path.resolve(__dirname, `../../src/rapports/output-tow.pdf`);
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

                if(flag) {
                    Appareil.save(request, response, result._id);
                }

                if(data.typeAppareil[0] == 'Famille AC1') {
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
        if (observateurs.length == 0) {
            return response.status(404).json({ msg: "Il n'y a aucune Appareil(s), équipement(s) ou installation(s)ult" });
        } else {
            return response.status(200).json(observateurs);
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
            return response.status(404).json({ msg: "Il n'y a aucune Appareil(s), équipement(s) ou installation(s)ult" });
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

        const observateurs = await Observateur.find(s);

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
    const completed = await Completed.findOne({ observateurId: observateurId });
    const tab = new Array(completed.renseignement, completed.description, completed.examen, completed.conclusion, completed.photo);
    let checker = arr => arr.every(v => v === true);
    if (checker(tab) == false) {
        response.status(400).json({ msg: "Le contrôle n'est pas entièrement terminé. Veuillez examiner toutes les entrées." });
    } else {
        try {
            await Observateur.updateOne({ _id: observateurId }, { $set: { etat: true } })
                .then((result) => {
                    console.log(result);
                    response.status(201).json({ msg: true });
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

}

const cacher = async (request, response) => {

    const observateurId = String(request.params.observateurId);
    console.log(observateurId)
    await Observateur.updateOne({ _id: observateurId }, { $set: { cache: true } })
        .then((result) => {
            console.log(result);
            response.status(201).json({ msg: true });
        })
        .catch((error) => {
            console.log(error)
            response.status(400).json(error);
        });
}



const deleteOne = async (request, response) => {
    try {
        const observateurId = String(request.params.observateurId)
        const result = await Observateur.deleteOne({ _id: observateurId });
        if (result.acknowledged == true && result.deletedCount == 1) {
            await Renseignement.deleteOne({ observateurId: observateurId });
            await Description.deleteOne({ observateurId: observateurId });
            await Examen.deleteOne({ observateurId: observateurId });
            await Conclusion.deleteOne({ observateurId: observateurId });
            await Commentaire.deleteOne({ observateurId: observateurId });
            const photo = await Photo.findOne({ observateurId: request.params.observateurId })
            if (photo) {
                await Photo.deleteOne({ observateurId: observateurId })
                    .then(() => {
                        const pathFile = path.resolve(__dirname, `../uploads/${photo.filename}`);
                        fs.unlink(pathFile, (err) => {
                            if (err) {
                                response.status(200).json({ msg: "Done Deleted!" })
                            } else {
                                response.status(200).json({ msg: "Done Deleted!" })
                            }
                        });
                    })
                    .catch((error) => {
                        response.status(400).json(error);
                    });
            }


        } else {
            response.status(200).json({ msg: "Done Deleted!" })
        }

    } catch (error) {
        console.log(error)
        response.status(400).json(error);
    }
}



const envoyer = async (request, response) => {

    const OAuth2 = google.auth.OAuth2;
    const OAuth2_client = new OAuth2(CLIENT_ID, SECRET_ID);
    OAuth2_client.setCredentials({ refresh_token: REFRESH_TOKEN })
    const accessToken = OAuth2_client.getAccessToken();

    const observateurId = String(request.params.observateurId);
    const inspecteurId = String(request.params.inspecteurId);
    const ip = request.params.ip;
    var geo = geoip.lookup(ip);

    const inspecteur = await Inspecteur.findById(inspecteurId);
    const observateur = await Observateur.findById(observateurId);
    const intervention = await Intervention.findById(observateur.interventionId);

    const emails = [
        "jamal.ettariqi@gthconsult.ma",
        "tarik.addioui@gthconsult.ma"
    ];

    // const email = "service.supports@gthconsult.ma";

    try {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: EMAIL,
                clientId: CLIENT_ID,
                clientSecret: SECRET_ID,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        });

        const filePath = path.join(__dirname, "/views/send_rapport.html");
        const source = fs.readFileSync(filePath, 'utf-8').toString();
        const template = handlebars.compile(source);
        const replacements = {
            img: "https://gthpdf.fra1.digitaloceanspaces.com/logogth.png",
            nom: inspecteur.nom,
            prenom: inspecteur.prenom,
            numeroAffaire: intervention.numeroAffaire,
            etablissement: intervention.etablissement,
            lieu: `${intervention.adresse} ${intervention.codePostal} ${intervention.codePostal} ${intervention.ville} ${intervention.pays}`,
            date: `${new Date(observateur.date).toLocaleDateString()}`,
            categorieAppareil: observateur.categorieAppareil,
            equipement: observateur.equipement,
            localisation: observateur.localisation,
            city: geo.city,
            dateEnvoyer: `${new Date().toLocaleDateString()}`,
            country: geo.country,
        };

        const htmlToSend = template(replacements);

        transporter.sendMail({
            from: EMAIL,
            to: emails,
            subject: `Demande de validation rapport de ${intervention.etablissement} générer par ${inspecteur.nom} ${inspecteur.prenom}`,
            html: htmlToSend,
            attachments: [{
                filename: 'output.docx', // <= Here: made sure file name match
                path: path.join(__dirname, '../rapports/output.docx'), // <= Here
                contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            }],
        }, (error, res) => {
            if (error) {
                console.log(error)
                response.status(400).json(error);
            } else {
                console.log(true)
                response.status(200).json(true);
            }
        });

    } catch (error) {
        console.log(error.message)
        response.status(400).json(error)
    }
}

export default { create, read, update, deleteOne, select, apercu, selected, envoyer, terminer, cacher, readTerminer }