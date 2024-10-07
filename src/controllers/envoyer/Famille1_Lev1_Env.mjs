import { Observateur } from "../../models/observateur.mjs";
import { Inspecteur } from "../../models/inspecteurs.mjs";
import { Intervention } from "../../models/intervention.mjs";
import { Photo } from "../../models/appareil_levage/famille1_lev1/photo.mjs";

import geoip from 'geoip-lite'

import nodemailer from "nodemailer";
import handlebars from "handlebars";
import { google } from "googleapis";

import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const envoyer = async (observateurId, inspecteurId, ip, response) => {
    
    const EMAIL = process.env.EMAIL
    const CLIENT_ID = process.env.CLIENT_ID
    const SECRET_ID = process.env.SECRET_ID
    const REFRESH_TOKEN = process.env.REFRESH_TOKEN

    const OAuth2 = google.auth.OAuth2;
    const OAuth2_client = new OAuth2(CLIENT_ID, SECRET_ID);
    OAuth2_client.setCredentials({ refresh_token: REFRESH_TOKEN })
    const accessToken = OAuth2_client.getAccessToken();

    const observateur = await Observateur.findById(observateurId);
    const inspecteur = await Inspecteur.findById(inspecteurId);
    const intervention = await Intervention.findById(observateur.interventionId);
    const photo = await Photo.findOne({ observateurId : observateurId});

    const emails = [
        "jamal.ettariqi@gthconsult.ma",
        "tarik.addioui@gthconsult.ma",
        "service.clients@gthconsult.ma",
        "khadija.sayoti@gthconsult.ma",
        "direction@gthconsult.ma",
        "service.supports@gthconsult.ma"
    ];

    var geo = geoip.lookup(ip);

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
        subject: `E-RAPPORT GTHCONSULT : Demande de validation rapport de ${intervention.etablissement}`,
        html: htmlToSend,
        attachments: [
        {
            filename: 'output.docx',
            path: path.join(__dirname, '../../rapports/output.docx'),
            contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        }, 
        {
            filename: photo.filename,
            path: path.join(__dirname, `../../uploads/${photo.filename}`)
        }
    ],
    }, (error, res) => {
        if (error) {
            console.log(1)
            console.log(error.message)
            response.status(400).json(error);
        } else {
            console.log(true)
            response.status(200).json(true);
        }
    });



}

export default { envoyer }