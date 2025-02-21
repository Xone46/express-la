import "dotenv/config";
import http from 'http';
import https from 'https';
import cookieParser from "cookie-parser";
import session from "express-session";
import express from "express";
import cors from 'cors';
import { connectAtlasDB } from "./dbAtlas.mjs"
import mongoose from "mongoose";
const app = express();
const PORT = process.env.PORT
import { loggingMiddleware } from "./middelwares/loggingMiddleware.mjs"
// import usersRouter from "./routes/users.mjs"
import chekinRouter from "./routes/chekin.mjs"
import inspecteurRouter from "./routes/inspecteurs.mjs"
import interventionRouter from "./routes/interventions.mjs"
import observateurRouter from "./routes/observateurs.mjs"
import filoRouter from "./routes/filos.mjs"
import commentaireRouter from "./routes/commentaire.mjs"
import reserveRouter from "./routes/reserve.mjs"


import appareil_levage_famille1_lev1_renseignements_Router from "./routes/appareil_levage/famille1_lev1/renseignement.mjs"
import appareil_levage_famille1_lev1_descriptions_Router from "./routes/appareil_levage/famille1_lev1/description.mjs"
import appareil_levage_famille1_lev1_examens_Router from "./routes/appareil_levage/famille1_lev1/examen.mjs"
import appareil_levage_famille1_lev1_photos_Router from "./routes/appareil_levage/famille1_lev1/photo.mjs"
import appareil_levage_famille1_lev1_conclusions_Router from "./routes/appareil_levage/famille1_lev1/conclusion.mjs"
// import appareil_levage_famille1_lev1_commentaires_Router from "./routes/appareil_levage/famille1_lev1/commentaire.mjs"
import appareil_levage_famille1_lev1_completeds_Router from "./routes/appareil_levage/famille1_lev1/completed.mjs"

import appareil_levage_famille2_lev2_renseignements_Router from "./routes/appareil_levage/famille2_lev2/renseignement.mjs"
import appareil_levage_famille2_lev2_descriptions_Router from "./routes/appareil_levage/famille2_lev2/description.mjs"
import appareil_levage_famille2_lev2_examens_Router from "./routes/appareil_levage/famille2_lev2/examen.mjs"
import appareil_levage_famille2_lev2_photos_Router from "./routes/appareil_levage/famille2_lev2/photo.mjs"
import appareil_levage_famille2_lev2_conclusions_Router from "./routes/appareil_levage/famille2_lev2/conclusion.mjs"
// import appareil_levage_famille2_lev2_commentaires_Router from "./routes/appareil_levage/famille2_lev2/commentaire.mjs"
import appareil_levage_famille2_lev2_completeds_Router from "./routes/appareil_levage/famille2_lev2/completed.mjs"

import appareil_levage_famille3_lev3_renseignements_Router from "./routes/appareil_levage/famille3_lev3/renseignement.mjs"
import appareil_levage_famille3_lev3_descriptions_Router from "./routes/appareil_levage/famille3_lev3/description.mjs"
import appareil_levage_famille3_lev3_examens_Router from "./routes/appareil_levage/famille3_lev3/examen.mjs"
import appareil_levage_famille3_lev3_photos_Router from "./routes/appareil_levage/famille3_lev3/photo.mjs"
import appareil_levage_famille3_lev3_conclusions_Router from "./routes/appareil_levage/famille3_lev3/conclusion.mjs"
// import appareil_levage_famille3_lev3_commentaires_Router from "./routes/appareil_levage/famille3_lev3/commentaire.mjs"
import appareil_levage_famille3_lev3_completeds_Router from "./routes/appareil_levage/famille3_lev3/completed.mjs"

import appareil_levage_famille4_lev4_renseignements_Router from "./routes/appareil_levage/famille4_lev4/renseignement.mjs"
import appareil_levage_famille4_lev4_descriptions_Router from "./routes/appareil_levage/famille4_lev4/description.mjs"
import appareil_levage_famille4_lev4_examens_Router from "./routes/appareil_levage/famille4_lev4/examen.mjs"
import appareil_levage_famille4_lev4_photos_Router from "./routes/appareil_levage/famille4_lev4/photo.mjs"
import appareil_levage_famille4_lev4_conclusions_Router from "./routes/appareil_levage/famille4_lev4/conclusion.mjs"
// import appareil_levage_famille4_lev4_commentaires_Router from "./routes/appareil_levage/famille4_lev4/commentaire.mjs"
import appareil_levage_famille4_lev4_completeds_Router from "./routes/appareil_levage/famille4_lev4/completed.mjs"

import appareil_levage_famille5_lev5_renseignements_Router from "./routes/appareil_levage/famille5_lev5/renseignement.mjs"
import appareil_levage_famille5_lev5_descriptions_Router from "./routes/appareil_levage/famille5_lev5/description.mjs"
import appareil_levage_famille5_lev5_examens_Router from "./routes/appareil_levage/famille5_lev5/examen.mjs"
import appareil_levage_famille5_lev5_photos_Router from "./routes/appareil_levage/famille5_lev5/photo.mjs"
import appareil_levage_famille5_lev5_conclusions_Router from "./routes/appareil_levage/famille5_lev5/conclusion.mjs"
// import appareil_levage_famille5_lev5_commentaires_Router from "./routes/appareil_levage/famille5_lev5/commentaire.mjs"
import appareil_levage_famille5_lev5_completeds_Router from "./routes/appareil_levage/famille5_lev5/completed.mjs"


import accessoire_levage_famille_ac1_renseignements_Router from "./routes/accessoire_levage/famille_ac1/renseignement.mjs"
import accessoire_levage_famille_ac1_fiches_Router from "./routes/accessoire_levage/famille_ac1/fiche.mjs"
import accessoire_levage_famille_ac1_photos_Router from "./routes/accessoire_levage/famille_ac1/photo.mjs"
import accessoire_levage_famille_ac1_accessoires_Router from "./routes/accessoire_levage/famille_ac1/accessoire.mjs"
import accessoire_levage_famille_ac1_completeds_Router from "./routes/accessoire_levage/famille_ac1/completed.mjs"

const url = 'https://www.google.com';
const protocol = url.startsWith('https') ? https : http;
protocol.get(url, (res) => {
    if (res.statusCode === 200) {
        connectAtlasDB();
    } else {
        console.log("Not connecte with server GTHCONSULT")
    }
}).on('error', () => {
    console.log(false)
});





mongoose.connect("mongodb://localhost/control")
    .then(() => {
        console.log("Connected Database Local");
    })
    .catch((error) => {
        console.log(`Error : ${error}`)
    });

app.use(express.json());
app.use(cors());
app.use(cookieParser(process.env.SECRET_COOKIE));
// Add headers before the routes are defined
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// app.use(cookieParser(process.env.SECRET_COOKIE));

// middelwares
app.use(loggingMiddleware);

// session
app.use(session({
    secret: process.env.SESSION,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 60000 * 60 * 2
    }
}));

// routes
// app.use("/api/v1/users", usersRouter);
app.use("/api/v1/chekins", chekinRouter);
app.use("/api/v1/inspecteurs", inspecteurRouter);
app.use("/api/v1/interventions", interventionRouter);
app.use("/api/v1/observateurs", observateurRouter);
app.use("/api/v1/filos", filoRouter);
app.use("/api/v1/commentaires", commentaireRouter);
app.use("/api/v1/reserves", reserveRouter);


app.use("/api/v1/accessoire_levage-famille_ac1/renseignements", accessoire_levage_famille_ac1_renseignements_Router);
app.use("/api/v1/accessoire_levage-famille_ac1/photos", accessoire_levage_famille_ac1_photos_Router);
app.use("/api/v1/accessoire_levage-famille_ac1/completeds", accessoire_levage_famille_ac1_completeds_Router);
app.use("/api/v1/accessoire_levage-famille_ac1/accessoires", accessoire_levage_famille_ac1_accessoires_Router);
app.use("/api/v1/accessoire_levage-famille_ac1/fiches", accessoire_levage_famille_ac1_fiches_Router);

app.use("/api/v1/appareil_levage-famille1_lev1/renseignements", appareil_levage_famille1_lev1_renseignements_Router);
app.use("/api/v1/appareil_levage-famille1_lev1/descriptions", appareil_levage_famille1_lev1_descriptions_Router);
app.use("/api/v1/appareil_levage-famille1_lev1/examens", appareil_levage_famille1_lev1_examens_Router);
app.use("/api/v1/appareil_levage-famille1_lev1/photos", appareil_levage_famille1_lev1_photos_Router);
app.use("/api/v1/appareil_levage-famille1_lev1/conclusions", appareil_levage_famille1_lev1_conclusions_Router);
// app.use("/api/v1/appareil_levage-famille1_lev1/commentaires", appareil_levage_famille1_lev1_commentaires_Router);
app.use("/api/v1/appareil_levage-famille1_lev1/completeds", appareil_levage_famille1_lev1_completeds_Router);

app.use("/api/v1/appareil_levage-famille2_lev2/renseignements", appareil_levage_famille2_lev2_renseignements_Router);
app.use("/api/v1/appareil_levage-famille2_lev2/descriptions", appareil_levage_famille2_lev2_descriptions_Router);
app.use("/api/v1/appareil_levage-famille2_lev2/examens", appareil_levage_famille2_lev2_examens_Router);
app.use("/api/v1/appareil_levage-famille2_lev2/photos", appareil_levage_famille2_lev2_photos_Router);
app.use("/api/v1/appareil_levage-famille2_lev2/conclusions", appareil_levage_famille2_lev2_conclusions_Router);
// app.use("/api/v1/appareil_levage-famille2_lev2/commentaires", appareil_levage_famille2_lev2_commentaires_Router);
app.use("/api/v1/appareil_levage-famille2_lev2/completeds", appareil_levage_famille2_lev2_completeds_Router);

app.use("/api/v1/appareil_levage-famille3_lev3/renseignements", appareil_levage_famille3_lev3_renseignements_Router);
app.use("/api/v1/appareil_levage-famille3_lev3/descriptions", appareil_levage_famille3_lev3_descriptions_Router);
app.use("/api/v1/appareil_levage-famille3_lev3/examens", appareil_levage_famille3_lev3_examens_Router);
app.use("/api/v1/appareil_levage-famille3_lev3/photos", appareil_levage_famille3_lev3_photos_Router);
app.use("/api/v1/appareil_levage-famille3_lev3/conclusions", appareil_levage_famille3_lev3_conclusions_Router);
// app.use("/api/v1/appareil_levage-famille3_lev3/commentaires", appareil_levage_famille3_lev3_commentaires_Router);
app.use("/api/v1/appareil_levage-famille3_lev3/completeds", appareil_levage_famille3_lev3_completeds_Router);

app.use("/api/v1/appareil_levage-famille4_lev4/renseignements", appareil_levage_famille4_lev4_renseignements_Router);
app.use("/api/v1/appareil_levage-famille4_lev4/descriptions", appareil_levage_famille4_lev4_descriptions_Router);
app.use("/api/v1/appareil_levage-famille4_lev4/examens", appareil_levage_famille4_lev4_examens_Router);
app.use("/api/v1/appareil_levage-famille4_lev4/photos", appareil_levage_famille4_lev4_photos_Router);
app.use("/api/v1/appareil_levage-famille4_lev4/conclusions", appareil_levage_famille4_lev4_conclusions_Router);
// app.use("/api/v1/appareil_levage-famille4_lev4/commentaires", appareil_levage_famille4_lev4_commentaires_Router);
app.use("/api/v1/appareil_levage-famille4_lev4/completeds", appareil_levage_famille4_lev4_completeds_Router);

app.use("/api/v1/appareil_levage-famille5_lev5/renseignements", appareil_levage_famille5_lev5_renseignements_Router);
app.use("/api/v1/appareil_levage-famille5_lev5/descriptions", appareil_levage_famille5_lev5_descriptions_Router);
app.use("/api/v1/appareil_levage-famille5_lev5/examens", appareil_levage_famille5_lev5_examens_Router);
app.use("/api/v1/appareil_levage-famille5_lev5/photos", appareil_levage_famille5_lev5_photos_Router);
app.use("/api/v1/appareil_levage-famille5_lev5/conclusions", appareil_levage_famille5_lev5_conclusions_Router);
// app.use("/api/v1/appareil_levage-famille5_lev5/commentaires", appareil_levage_famille5_lev5_commentaires_Router);
app.use("/api/v1/appareil_levage-famille5_lev5/completeds", appareil_levage_famille5_lev5_completeds_Router);




// generate cookie for client ID
app.get("/", (request, response) => {
    response.cookie("name", "test", { maxAge: 60000 * 60 * 24, signed: true });
    // response.cookie("name", "test", { maxAge : 60000 * 60 * 24 });
    request.session.visited = true;
    request.session.name = "Xone46";
    console.log(request.session);
    console.log(request.session.id);
    response.status(200).json({ msg: "Hello World" });
});


app.listen(PORT, () => {
    console.log(`Server running in port : ${PORT}`)
});