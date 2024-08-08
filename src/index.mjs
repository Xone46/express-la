import "dotenv/config";
import cookieParser from "cookie-parser";
import session from "express-session";
import express from "express";
import cors from 'cors';
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


import appareil_levage_famille1_lev1_renseignements_Router from "./routes/appareil_levage/famille1_lev1/renseignement.mjs"
import appareil_levage_famille1_lev1_descriptions_Router from "./routes/appareil_levage/famille1_lev1/description.mjs"
import appareil_levage_famille1_lev1_examens_Router from "./routes/appareil_levage/famille1_lev1/examen.mjs"
import appareil_levage_famille1_lev1_photos_Router from "./routes/appareil_levage/famille1_lev1/photo.mjs"
import appareil_levage_famille1_lev1_conclusions_Router from "./routes/appareil_levage/famille1_lev1/conclusion.mjs"
import appareil_levage_famille1_lev1_commentaires_Router from "./routes/appareil_levage/famille1_lev1/commentaire.mjs"
import appareil_levage_famille1_lev1_completeds_Router from "./routes/appareil_levage/famille1_lev1/completed.mjs"



import accessoire_levage_famille_ac1_renseignements_Router from "./routes/accessoire_levage/famille_ac1/renseignement.mjs"
import accessoire_levage_famille_ac1_descriptions_Router from "./routes/accessoire_levage/famille_ac1/description.mjs"
import accessoire_levage_famille_ac1_examens_Router from "./routes/accessoire_levage/famille_ac1/examen.mjs"
import accessoire_levage_famille_ac1_photos_Router from "./routes/accessoire_levage/famille_ac1/photo.mjs"
import accessoire_levage_famille_ac1_conclusions_Router from "./routes/accessoire_levage/famille_ac1/conclusion.mjs"
import accessoire_levage_famille_ac1_commentaires_Router from "./routes/accessoire_levage/famille_ac1/commentaire.mjs"
import accessoire_levage_famille_ac1_accessoires_Router from "./routes/accessoire_levage/famille_ac1/accessoire.mjs"
import accessoire_levage_famille_ac1_completeds_Router from "./routes/accessoire_levage/famille_ac1/completed.mjs"


mongoose.connect("mongodb://localhost/control")
.then(() => {
    console.log("connected Database");
})
.catch((error) => {
    console.log(`Error : ${error}`)
});

app.use(express.json());
app.use(cors());
app.use(cookieParser(process.env.SECRET_COOKIE));
// Add headers before the routes are defined
app.use(function(req, res, next) {
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
    secret : process.env.SESSION,
    saveUninitialized : false,
    resave : false,
    cookie : {
        maxAge : 60000 * 60 * 2
    }
}));

// routes
// app.use("/api/v1/users", usersRouter);
app.use("/api/v1/chekins", chekinRouter);
app.use("/api/v1/inspecteurs", inspecteurRouter);
app.use("/api/v1/interventions", interventionRouter);
app.use("/api/v1/observateurs", observateurRouter);
app.use("/api/v1/filos", filoRouter);


app.use("/api/v1/accessoire_levage-famille_ac1/renseignements", accessoire_levage_famille_ac1_renseignements_Router);
app.use("/api/v1/accessoire_levage-famille_ac1/descriptions", accessoire_levage_famille_ac1_descriptions_Router);
app.use("/api/v1/accessoire_levage-famille_ac1/examens", accessoire_levage_famille_ac1_examens_Router);
app.use("/api/v1/accessoire_levage-famille_ac1/photos", accessoire_levage_famille_ac1_photos_Router);
app.use("/api/v1/accessoire_levage-famille_ac1/conclusions", accessoire_levage_famille_ac1_conclusions_Router);
app.use("/api/v1/accessoire_levage-famille_ac1/commentaires", accessoire_levage_famille_ac1_commentaires_Router);
app.use("/api/v1/accessoire_levage-famille_ac1/completeds", accessoire_levage_famille_ac1_completeds_Router);
app.use("/api/v1/accessoire_levage-famille_ac1/accessoires", accessoire_levage_famille_ac1_accessoires_Router);


app.use("/api/v1/appareil_levage-famille1_lev1/renseignements", appareil_levage_famille1_lev1_renseignements_Router);
app.use("/api/v1/appareil_levage-famille1_lev1/descriptions", appareil_levage_famille1_lev1_descriptions_Router);
app.use("/api/v1/appareil_levage-famille1_lev1/examens", appareil_levage_famille1_lev1_examens_Router);
app.use("/api/v1/appareil_levage-famille1_lev1/photos", appareil_levage_famille1_lev1_photos_Router);
app.use("/api/v1/appareil_levage-famille1_lev1/conclusions", appareil_levage_famille1_lev1_conclusions_Router);
app.use("/api/v1/appareil_levage-famille1_lev1/commentaires", appareil_levage_famille1_lev1_commentaires_Router);
app.use("/api/v1/appareil_levage-famille1_lev1/completeds", appareil_levage_famille1_lev1_completeds_Router);




// generate cookie for client ID
app.get("/", (request, response) => {
    response.cookie("name", "test", { maxAge : 60000 * 60 * 24, signed : true });
    // response.cookie("name", "test", { maxAge : 60000 * 60 * 24 });
    request.session.visited = true;
    request.session.name = "Xone46";
    console.log(request.session);
    console.log(request.session.id);
    response.status(200).json({ msg : "Hello World"});
});



//-----> localhost:3000/api/users?id=value1&name=value2 (with query)
// app.get("/api/v1/users", (request, response) => {
//   console.log(request.query)
//   const { query : { id , name } } = request;
// });



app.listen(PORT, () => {
    console.log(`Server running in port : ${PORT}`)
})