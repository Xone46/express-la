
import { Intervention } from "../models/intervention.mjs";
import { Inspecteur } from "../models/inspecteurs.mjs";
import { Observateur } from "../models/observateur.mjs";
import { Renseignement } from "../models/renseignement.mjs";
import { Examen } from "../models/examen.mjs";
import { Description } from "../models/description.mjs";
import { Conclusion } from "../models/conclusion.mjs";
import { Photo } from "../models/photo.mjs";
import { Commentaire } from "../models/commentaire.mjs";
// import docxConverter from 'docx-pdf';
// import convert from 'node-convert';
// import conversion from '@groupdocs/groupdocs.conversion';

import { query, body, validationResult, matchedData, checkSchema } from "express-validator"
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const apercu = async (request, response) => {

    const observateurId = String(request.params.observateurId);
    const interventionId = String(request.params.interventionId);
    const inspecteurId = String(request.params.inspecteurId);

    const intervention = await Intervention.findById(interventionId);
    // console.log(intervention);

    const inspecteur = await Inspecteur.findById(inspecteurId);
    // console.log(inspecteur);

    const observateur = await Observateur.findById(observateurId);
    // console.log(observateur);

    const pathFile = path.resolve(__dirname, `../rapports/${observateur.interventionId}.docx`);
    fs.unlink(pathFile, (err) => {
        if (!err) {
            console.log('File is deleted.');
        } 
    });

    const renseignement = await Renseignement.findOne({ observateurId: observateurId });
    // console.log(renseignement);

    const examen = await Examen.findOne({ observateurId: observateurId });
    // console.log(examen);

    const sourceEnergie = new Array();
    const description = await Description.findOne({ observateurId: observateurId });
    console.log(description);

    for(let j in description.sourceDenergie) {
        for (const [key, value] of Object.entries(description.sourceDenergie[j])) {
            if(value != null && value != undefined && value != "") {
                sourceEnergie.push({
                    name : `${key} : ${value}`
                });
            } 
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
    // console.log(photo)

    const aExamen = new Array();

    for(let i = 0; i < examen.a.length; i++) {

        if(examen.a[i].be == true) {
            aExamen.push({
                titre : examen.a[i].titre,
                be : "X",
                fc : "",
                sa : "",
                nv : "",
                so : "",
                o : ""
            });
        }

        if(examen.a[i].fc == true) {
            aExamen.push({
                titre : examen.a[i].titre,
                be : "",
                fc : "X",
                sa : "",
                nv : "",
                so : "",
                o : ""
            });
        }

        if(examen.a[i].sa == true) {
            aExamen.push({
                titre : examen.a[i].titre,
                be : "",
                fc : "",
                sa : "X",
                nv : "",
                so : "",
                o : ""
            });
        }

        if(examen.a[i].nv == true) {
            aExamen.push({
                titre : examen.a[i].titre,
                be : "",
                fc : "",
                sa : "",
                nv : "X",
                so : "",
                o : ""
            });
        }

        if(examen.a[i].so == true) {
            aExamen.push({
                titre : examen.a[i].titre,
                be : "",
                fc : "",
                sa : "",
                nv : "",
                so : "X",
                o : ""
            });
        }

        if(examen.a[i].o == true) {
            aExamen.push({
                titre : examen.a[i].titre,
                be : "",
                fc : "",
                sa : "",
                nv : "",
                so : "",
                o : "X"
            });
        }

    }

    const bExamen = new Array();
    for(let i = 0; i < examen.b.length; i++) {

        if(examen.b[i].be == true) {
            bExamen.push({
                titre : examen.b[i].titre,
                be : "X",
                fc : "",
                sa : "",
                nv : "",
                so : "",
                o : ""
            });
        }

        if(examen.b[i].fc == true) {
            bExamen.push({
                titre : examen.b[i].titre,
                be : "",
                fc : "X",
                sa : "",
                nv : "",
                so : "",
                o : ""
            });
        }

        if(examen.b[i].sa == true) {
            bExamen.push({
                titre : examen.b[i].titre,
                be : "",
                fc : "",
                sa : "X",
                nv : "",
                so : "",
                o : ""
            });
        }

        if(examen.b[i].nv == true) {
            bExamen.push({
                titre : examen.b[i].titre,
                be : "",
                fc : "",
                sa : "",
                nv : "X",
                so : "",
                o : ""
            });
        }

        if(examen.b[i].so == true) {
            bExamen.push({
                titre : examen.b[i].titre,
                be : "",
                fc : "",
                sa : "",
                nv : "",
                so : "X",
                o : ""
            });
        }

        if(examen.b[i].o == true) {
            bExamen.push({
                titre : examen.b[i].titre,
                be : "",
                fc : "",
                sa : "",
                nv : "",
                so : "",
                o : "X"
            });
        }
    }


    const cExamen = new Array();
    for(let i = 0; i < examen.c.length; i++) {

        if(examen.c[i].be == true) {
            cExamen.push({
                titre : examen.c[i].titre,
                be : "X",
                fc : "",
                sa : "",
                nv : "",
                so : "",
                o : ""
            });
        }

        if(examen.c[i].fc == true) {
            cExamen.push({
                titre : examen.c[i].titre,
                be : "",
                fc : "X",
                sa : "",
                nv : "",
                so : "",
                o : ""
            });
        }

        if(examen.c[i].sa == true) {
            cExamen.push({
                titre : examen.c[i].titre,
                be : "",
                fc : "",
                sa : "X",
                nv : "",
                so : "",
                o : ""
            });
        }

        if(examen.c[i].nv == true) {
            cExamen.push({
                titre : examen.c[i].titre,
                be : "",
                fc : "",
                sa : "",
                nv : "X",
                so : "",
                o : ""
            });
        }

        if(examen.c[i].so == true) {
            cExamen.push({
                titre : examen.c[i].titre,
                be : "",
                fc : "",
                sa : "",
                nv : "",
                so : "X",
                o : ""
            });
        }

        if(examen.c[i].o == true) {
            cExamen.push({
                titre : examen.c[i].titre,
                be : "",
                fc : "",
                sa : "",
                nv : "",
                so : "",
                o : "X"
            });
        }
    }


    const dExamen = new Array();
    for(let i = 0; i < examen.d.length; i++) {

        if(examen.d[i].be == true) {
            dExamen.push({
                titre : examen.d[i].titre,
                be : "X",
                fc : "",
                sa : "",
                nv : "",
                so : "",
                o : ""
            });
        }

        if(examen.d[i].fc == true) {
            dExamen.push({
                titre : examen.d[i].titre,
                be : "",
                fc : "X",
                sa : "",
                nv : "",
                so : "",
                o : ""
            });
        }

        if(examen.d[i].sa == true) {
            dExamen.push({
                titre : examen.d[i].titre,
                be : "",
                fc : "",
                sa : "X",
                nv : "",
                so : "",
                o : ""
            });
        }

        if(examen.d[i].nv == true) {
            dExamen.push({
                titre : examen.d[i].titre,
                be : "",
                fc : "",
                sa : "",
                nv : "X",
                so : "",
                o : ""
            });
        }

        if(examen.d[i].so == true) {
            dExamen.push({
                titre : examen.d[i].titre,
                be : "",
                fc : "",
                sa : "",
                nv : "",
                so : "X",
                o : ""
            });
        }

        if(examen.d[i].o == true) {
            dExamen.push({
                titre : examen.d[i].titre,
                be : "",
                fc : "",
                sa : "",
                nv : "",
                so : "",
                o : "X"
            });
        }
    }


    const eExamen = new Array();
    for(let i = 0; i < examen.e.length; i++) {

        if(examen.e[i].be == true) {
            eExamen.push({
                titre : examen.e[i].titre,
                be : "X",
                fc : "",
                sa : "",
                nv : "",
                so : "",
                o : ""
            });
        }

        if(examen.e[i].fc == true) {
            eExamen.push({
                titre : examen.e[i].titre,
                be : "",
                fc : "X",
                sa : "",
                nv : "",
                so : "",
                o : ""
            });
        }

        if(examen.e[i].sa == true) {
            eExamen.push({
                titre : examen.e[i].titre,
                be : "",
                fc : "",
                sa : "X",
                nv : "",
                so : "",
                o : ""
            });
        }

        if(examen.e[i].nv == true) {
            eExamen.push({
                titre : examen.e[i].titre,
                be : "",
                fc : "",
                sa : "",
                nv : "X",
                so : "",
                o : ""
            });
        }

        if(examen.e[i].so == true) {
            eExamen.push({
                titre : examen.e[i].titre,
                be : "",
                fc : "",
                sa : "",
                nv : "",
                so : "X",
                o : ""
            });
        }

        if(examen.e[i].o == true) {
            eExamen.push({
                titre : examen.e[i].titre,
                be : "X",
                fc : "",
                sa : "",
                nv : "",
                so : "",
                o : "X"
            });
        }
    }


    const fExamen = new Array();
    for(let i = 0; i < examen.f.length; i++) {

        if(examen.f[i].be == true) {
            fExamen.push({
                titre : examen.f[i].titre,
                be : "X",
                fc : "",
                sa : "",
                nv : "",
                so : "",
                o : ""
            });
        }

        if(examen.f[i].fc == true) {
            fExamen.push({
                titre : examen.f[i].titre,
                be : "",
                fc : "X",
                sa : "",
                nv : "",
                so : "",
                o : ""
            });
        }

        if(examen.f[i].sa == true) {
            fExamen.push({
                titre : examen.f[i].titre,
                be : "",
                fc : "",
                sa : "X",
                nv : "",
                so : "",
                o : ""
            });
        }

        if(examen.f[i].nv == true) {
            fExamen.push({
                titre : examen.f[i].titre,
                be : "",
                fc : "",
                sa : "",
                nv : "X",
                so : "",
                o : ""
            });
        }

        if(examen.f[i].so == true) {
            fExamen.push({
                titre : examen.f[i].titre,
                be : "",
                fc : "",
                sa : "",
                nv : "",
                so : "X",
                o : ""
            });
        }

        if(examen.f[i].o == true) {
            fExamen.push({
                titre : examen.f[i].titre,
                be : "",
                fc : "",
                sa : "",
                nv : "",
                so : "",
                o : "X"
            });
        }
    }

    const gExamen = new Array();
    for(let i = 0; i < examen.g.length; i++) {

        if(examen.g[i].be == true) {
            gExamen.push({
                titre : examen.g[i].titre,
                be : "X",
                fc : "",
                sa : "",
                nv : "",
                so : "",
                o : ""
            });
        }

        if(examen.g[i].fc == true) {
            gExamen.push({
                titre : examen.g[i].titre,
                be : "",
                fc : "X",
                sa : "",
                nv : "",
                so : "",
                o : ""
            });
        }

        if(examen.g[i].sa == true) {
            gExamen.push({
                titre : examen.g[i].titre,
                be : "",
                fc : "",
                sa : "X",
                nv : "",
                so : "",
                o : ""
            });
        }

        if(examen.g[i].nv == true) {
            gExamen.push({
                titre : examen.g[i].titre,
                be : "",
                fc : "",
                sa : "",
                nv : "X",
                so : "",
                o : ""
            });
        }

        if(examen.g[i].so == true) {
            gExamen.push({
                titre : examen.g[i].titre,
                be : "",
                fc : "",
                sa : "",
                nv : "",
                so : "X",
                o : ""
            });
        }

        if(examen.g[i].o == true) {
            gExamen.push({
                titre : examen.g[i].titre,
                be : "",
                fc : "",
                sa : "",
                nv : "",
                so : "",
                o : "X"
            });
        }
    }

    const hExamen = new Array();
    for(let i = 0; i < examen.h.length; i++) {

        if(examen.h[i].be == true) {
            hExamen.push({
                titre : examen.h[i].titre,
                be : "X",
                fc : "",
                sa : "",
                nv : "",
                so : "",
                o : ""
            });
        }

        if(examen.h[i].fc == true) {
            hExamen.push({
                titre : examen.h[i].titre,
                be : "",
                fc : "X",
                sa : "",
                nv : "",
                so : "",
                o : ""
            });
        }

        if(examen.h[i].sa == true) {
            hExamen.push({
                titre : examen.h[i].titre,
                be : "",
                fc : "",
                sa : "X",
                nv : "",
                so : "",
                o : ""
            });
        }

        if(examen.h[i].nv == true) {
            hExamen.push({
                titre : examen.h[i].titre,
                be : "",
                fc : "",
                sa : "",
                nv : "X",
                so : "",
                o : ""
            });
        }

        if(examen.h[i].so == true) {
            hExamen.push({
                titre : examen.h[i].titre,
                be : "",
                fc : "",
                sa : "",
                nv : "",
                so : "X",
                o : ""
            });
        }

        if(examen.h[i].o == true) {
            hExamen.push({
                titre : examen.h[i].titre,
                be : "",
                fc : "",
                sa : "",
                nv : "",
                so : "",
                o : "X"
            });
        }
    }

    const iExamen = new Array();
    for(let i = 0; i < examen.i.length; i++) {

        if(examen.i[i].be == true) {
            iExamen.push({
                titre : examen.i[i].titre,
                be : "X",
                fc : "",
                sa : "",
                nv : "",
                so : "",
                o : ""
            });
        }

        if(examen.i[i].fc == true) {
            iExamen.push({
                titre : examen.i[i].titre,
                be : "",
                fc : "X",
                sa : "",
                nv : "",
                so : "",
                o : ""
            });
        }

        if(examen.i[i].sa == true) {
            iExamen.push({
                titre : examen.i[i].titre,
                be : "",
                fc : "",
                sa : "X",
                nv : "",
                so : "",
                o : ""
            });
        }

        if(examen.i[i].nv == true) {
            iExamen.push({
                titre : examen.i[i].titre,
                be : "",
                fc : "",
                sa : "",
                nv : "X",
                so : "",
                o : ""
            });
        }

        if(examen.i[i].so == true) {
            iExamen.push({
                titre : examen.i[i].titre,
                be : "",
                fc : "",
                sa : "",
                nv : "",
                so : "X",
                o : ""
            });
        }

        if(examen.i[i].o == true) {
            iExamen.push({
                titre : examen.i[i].titre,
                be : "",
                fc : "",
                sa : "",
                nv : "",
                so : "",
                o : "X"
            });
        }
    }

    const jExamen = new Array();
    for(let i = 0; i < examen.j.length; i++) {

        if(examen.j[i].be == true) {
            jExamen.push({
                titre : examen.j[i].titre,
                be : "X",
                fc : "",
                sa : "",
                nv : "",
                so : "",
                o : ""
            });
        }

        if(examen.j[i].fc == true) {
            jExamen.push({
                titre : examen.j[i].titre,
                be : "",
                fc : "X",
                sa : "",
                nv : "",
                so : "",
                o : ""
            });
        }

        if(examen.j[i].sa == true) {
            jExamen.push({
                titre : examen.j[i].titre,
                be : "",
                fc : "",
                sa : "X",
                nv : "",
                so : "",
                o : ""
            });
        }

        if(examen.j[i].nv == true) {
            jExamen.push({
                titre : examen.j[i].titre,
                be : "",
                fc : "",
                sa : "",
                nv : "X",
                so : "",
                o : ""
            });
        }

        if(examen.j[i].so == true) {
            jExamen.push({
                titre : examen.j[i].titre,
                be : "",
                fc : "",
                sa : "",
                nv : "",
                so : "X",
                o : ""
            });
        }

        if(examen.j[i].o == true) {
            jExamen.push({
                titre : examen.j[i].titre,
                be : "",
                fc : "",
                sa : "",
                nv : "",
                so : "",
                o : "X"
            });
        }
    }

    const kExamen = new Array();
    for(let i = 0; i < examen.k.length; i++) {

        if(examen.k[i].be == true) {
            kExamen.push({
                titre : examen.k[i].titre,
                be : "X",
                fc : "",
                sa : "",
                nv : "",
                so : "",
                o : ""
            });
        }

        if(examen.k[i].fc == true) {
            kExamen.push({
                titre : examen.k[i].titre,
                be : "",
                fc : "X",
                sa : "",
                nv : "",
                so : "",
                o : ""
            });
        }

        if(examen.k[i].sa == true) {
            kExamen.push({
                titre : examen.k[i].titre,
                be : "",
                fc : "",
                sa : "X",
                nv : "",
                so : "",
                o : ""
            });
        }

        if(examen.k[i].nv == true) {
            kExamen.push({
                titre : examen.k[i].titre,
                be : "",
                fc : "",
                sa : "",
                nv : "X",
                so : "",
                o : ""
            });
        }

        if(examen.k[i].so == true) {
            kExamen.push({
                titre : examen.k[i].titre,
                be : "",
                fc : "",
                sa : "",
                nv : "",
                so : "X",
                o : ""
            });
        }

        if(examen.k[i].o == true) {
            kExamen.push({
                titre : examen.k[i].titre,
                be : "",
                fc : "",
                sa : "",
                nv : "",
                so : "",
                o : "X"
            });
        }
    }


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

        // Partie One
        refClient : "<<G-T-H-X-P-R>>",
        numeroAffaire : "<<G-T-H-X-P-R>>",
        numeroRapport : "<<G-T-H-X-P-R>>",
        annee : new Date().getFullYear(),

        //Partie Tow
        equipement : observateur.equipement,
        categorieAppareil : observateur.categorieAppareil,
        etablissement : intervention.etablissement,
        adresse : intervention.adresse,
        codePostal : intervention.codePostal,
        ville : intervention.ville,
        pays : intervention.pays,

        // Partie Tree
        constructeur : observateur.constructeur,
        marquage : observateur.marquage,
        typeVerification : observateur.typeVerification,
        numeroSerie : observateur.numeroSerie,
        localisation : observateur.localisation,
        dateVerfication : new Date(observateur.date).toLocaleDateString(),
        inspecteur : `${inspecteur.nom} ${inspecteur.prenom}`,
        accompagnateur : observateur.accompagnateur,
        dateEmission  : new Date().toLocaleDateString(),

        //Partie Four
        // constructeur : observateur.constructeur, (Deja)
        typeConstructeur : renseignement.typeConstructeur,
        anneeMiseService : renseignement.anneeMiseService,
        numeroSerieRenseignement : renseignement.numeroSerie,
        numeroInterneRenseignement : renseignement.numeroInterne,
        numeroInterneAutre : renseignement.numeroInterneAutre,
        localistationRenseignement : renseignement.localisation,
        typeAppareil : renseignement.typeAppareil,
        typeAppareilAutre : renseignement.typeAppareilAutre,
        miseEnServiceRapport : renseignement.miseEnServiceRapport,
        miseEnServiceEpreuves : renseignement.miseEnServiceEpreuves,
        miseEnServiceEpreuvesAutre : renseignement.miseEnServiceEpreuvesAutre,
        dateDerniereVerficationPeriodique : renseignement.dateDerniereVerficationPeriodique,
        dateDerniereVerficationPeriodiqueAutre : renseignement.dateDerniereVerficationPeriodiqueAutre,
        dateDerniereVerficationPeriodiqueRapport : renseignement.dateDerniereVerficationPeriodiqueRapport,
        essaischarge : renseignement.essaischarge,
        essaischargeAutre: renseignement.essaischargeAutre,
        modification: renseignement.modification,
        modificationAutre: renseignement.modificationAutre,

        // Partie Five
        marquage : description.marquage,
        modeDeLevage : description.modeDeLevage,
        chargeMaximaleUtile : description.caracteristiques[0].chargeMaximaleUtile,
        hauteurDeLevage : description.caracteristiques[0].hauteurDeLevage,
        portee : description.caracteristiques[0].portee,
        porteFaux : description.caracteristiques[0].porteFaux,
        longueurDuCheminDeRoulement : description.caracteristiques[0].longueurDuCheminDeRoulement,
        mouflage : description.caracteristiques[0].mouflage,
        diametre : description.caracteristiques[0].diametre,

        sansObjet : description.levageAuxiliaire[0].sansObjet,
        chargeMaximale : description.levageAuxiliaire[0].chargeMaximaleUtileDeChaquePalan,
        mouflageLevage : description.levageAuxiliaire[0].mouflage,
        diametreLevage : description.levageAuxiliaire[0].diametre,
        modeInstallation : description.modeInstallation,
        modeInstallationDetails : description.modeInstallationDetails,
        modeInstallationDetailsAutre : description.modeInstallationDetailsAutre,
        sourceEnergie : sourceEnergie,




        //Partie Six
        aExamen : aExamen,
        bExamen : bExamen,
        cExamen : cExamen,
        dExamen : dExamen,
        eExamen : eExamen,
        fExamen : fExamen,
        gExamen : gExamen,
        hExamen : hExamen,
        iExamen : iExamen,
        jExamen : jExamen,
        kExamen : kExamen,

        //Partie Eight
        a : a,
        b : b,
        c : c,
        d : d,
        e : e,
        f : f,
        g : g,
        poids : poids,
        commentaire : commentaire
    });

    const buf = doc.getZip().generate({
        type: "nodebuffer",
        compression: "DEFLATE",
    });

    const flagSuccesWrite = await fs.writeFileSync(pathFile, buf);

    if (flagSuccesWrite == undefined) {
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

            await Renseignement.deleteOne({ observateurId: request.params.observateurId })
            .then(async () => {
                await Description.deleteOne({ observateurId: request.params.observateurId })
                .then(async() => {
                    await Examen.deleteOne({ observateurId: request.params.observateurId })
                    .then(async () => {
                        await Conclusion.deleteOne({ observateurId: request.params.observateurId })
                        .then(async () => {
                            await Commentaire.deleteOne({ observateurId: request.params.observateurId })
                            .then(async() => {

                                const photo = await Photo.findOne({ observateurId: request.params.observateurId })
                                await Photo.deleteOne({ observateurId: request.params.observateurId })
                                    .then(() => {
                                        const pathFile = path.resolve(__dirname, `../uploads/${photo.filename}`);
                                        fs.unlink(pathFile, (err) => {
                                            if (err) {
                                                console.error(err);
                                            } else {
                                                response.status(200).json({ msg: "Done Deleted!" })
                                            }
                                        });
                                    })
                                    .catch((error) => {
                                        response.status(400).json(error);
                                    });
                            })
                            .catch((error) => {
                                response.status(400).json(error);
                            });
                        })
                        .catch((error) => {
                            response.status(400).json(error);
                        });
                    })
                    .catch((error) => {
                        response.status(400).json(error);
                    });
                })
                .catch((error) => {
                    response.status(400).json(error);
                });
            })
            .catch((error) => {
                response.status(400).json(error)
            });

        }

    } catch (error) {
        console.log(error)
        response.status(400).json(error);
    }
}

export default { create, read, update, deleteOne, select, apercu }