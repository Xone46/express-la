import { Observateur } from "../../../models/observateur.mjs";
import { Inspecteur } from "../../../models/inspecteurs.mjs";
import { Intervention } from "../../../models/intervention.mjs";
import { createOneModel } from '../../../models/one.mjs';
import { createParentModel } from '../../../models/parent.mjs';
import AWS from "aws-sdk";


import { PhotoFamilleFourLevFour } from "../../../models/appareil_levage/famille4_lev4/photo.mjs";

const DO_SPACES_ENDPOINT = process.env.DO_SPACES_ENDPOINT
const DO_SPACES_KEY = process.env.DO_SPACES_KEY
const DO_SPACES_SECRET = process.env.DO_SPACES_SECRET

const EMAIL = process.env.EMAIL
const CLIENT_ID = process.env.CLIENT_ID
const SECRET_ID = process.env.SECRET_ID
const REFRESH_TOKEN = process.env.REFRESH_TOKEN

import geoip from 'geoip-lite'

import nodemailer from "nodemailer";
import handlebars from "handlebars";
import { google } from "googleapis";

import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const spacesEndpoint = new AWS.Endpoint(DO_SPACES_ENDPOINT);
const s3 = new AWS.S3({
    endpoint: spacesEndpoint,
    accessKeyId: DO_SPACES_KEY,
    secretAccessKey: DO_SPACES_SECRET,
});


const envoyer = async (observateurId, inspecteurId, ip, response) => {

    // Get info Inspecteur
    const inspecteur = await Inspecteur.findById(inspecteurId);
    const observateur = await Observateur.findById(observateurId);
    const intervention = await Intervention.findById(observateur.interventionId);
    const photo = await PhotoFamilleFourLevFour.findOne({ observateurId : observateurId});

    const namefile = `Rapport-${observateur.typeAppareil[0]}-${observateur.typeAppareil[1]}-${intervention.etablissement}`

    const prenom = String(inspecteur.prenom).toLocaleLowerCase();
    const nom = String(inspecteur.nom).toLocaleUpperCase();
    const email = String(inspecteur.email);

    // // Get info parent
    const Parent = await createParentModel();
    const resultParent = await Parent.findOne({ originalname: prenom });
    const parent = String(resultParent._id);

    // Get file path
    const filepath = path.join(__dirname, '../../../rapports/output.docx');

    // Read the file from the given file path
    const fileStream = fs.createReadStream(filepath);

    // Get the file name and set the S3 key (file name)
    const fileName = path.basename(filepath);
    const s3Key = `gth-${Date.now().toString(10).slice(2, 10)}-${fileName}`;

    // Define the S3 upload parameters
    const uploadParams = {
        Bucket: "one", // Your DigitalOcean Space name
        Key: s3Key, // Path in the Space
        Body: fileStream, // File content
        acl: 'public-read', // Set the file to be publicly readable (optional)
    };

    // Upload the file to DigitalOcean Spaces
    return s3.upload(uploadParams).promise()
        .then(async (data) => {
            const One = await createOneModel();  // Get the Author model with Atlas connection
            const newOne = new One({
                email: email,
                nom: nom,
                prenom: prenom,
                nested: [],
                partager: [],
                originalname: namefile,
                filename: s3Key,
                location: data.Location,
                type: "Fichier",
                parent: parent
            });

            const one = await newOne.save();
            if (one) {

                const OAuth2 = google.auth.OAuth2;
                const OAuth2_client = new OAuth2(CLIENT_ID, SECRET_ID);
                OAuth2_client.setCredentials({ refresh_token: REFRESH_TOKEN })
                const accessToken = OAuth2_client.getAccessToken();



                const emails = [
                    "jamal.ettariqi@gthconsult.ma",
                    "tarik.addioui@gthconsult.ma",
                    "service.clients@gthconsult.ma"
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

                const filePath = path.join(__dirname, "../../../controllers/envoyer/views/send_rapport.html");

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
                        path: path.join(__dirname, '../../../rapports/output.docx'),
                        contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                    }, 
                    {
                        filename: photo.filename,
                        path: path.join(__dirname, `../../../uploads/${photo.filename}`)
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
        })
        .catch((err) => {
            console.error('Error uploading file:', err);
            throw err;
        });

}

export default { envoyer }