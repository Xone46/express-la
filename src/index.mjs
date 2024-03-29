import "dotenv/config";
import cookieParser from "cookie-parser";
import session from "express-session";
import express from "express";
import cors from 'cors';
import mongoose from "mongoose";
const app = express();
const PORT = process.env.PORT
import { loggingMiddleware } from "./middelwares/loggingMiddleware.mjs"
import usersRouter from "./routes/users.mjs"
import productsRouter from "./routes/products.mjs"
import chekinRouter from "./routes/chekin.mjs"
import inspecteurRouter from "./routes/inspecteurs.mjs"
import interventionRouter from "./routes/interventions.mjs"
import observateurRouter from "./routes/observateurs.mjs"
import renseignementRouter from "./routes/renseignement.mjs"
import descriptionRouter from "./routes/descriptions.mjs"
import examenRouter from "./routes/examen.mjs"
import photoRouter from "./routes/photo.mjs"
import conclusionRouter from "./routes/conclusion.mjs"
import commentaireRouter from "./routes/commentaire.mjs"
import completedRouter from "./routes/completed.mjs"

mongoose.connect("mongodb://localhost/control")
.then(() => {
    console.log("connected Database");
})
.catch((error) => {
    console.log(`Error : ${error}`)
});

app.use(express.json());
app.use(cors())
app.use(cookieParser(process.env.SECRET_COOKIE));
// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
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
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/products", productsRouter);
app.use("/api/v1/chekins", chekinRouter);
app.use("/api/v1/inspecteurs", inspecteurRouter);
app.use("/api/v1/interventions", interventionRouter);
app.use("/api/v1/observateurs", observateurRouter);
app.use("/api/v1/renseignements", renseignementRouter);
app.use("/api/v1/descriptions", descriptionRouter);
app.use("/api/v1/examens", examenRouter);
app.use("/api/v1/photos", photoRouter);
app.use("/api/v1/conclusions", conclusionRouter);
app.use("/api/v1/commentaires", commentaireRouter);
app.use("/api/v1/completeds", completedRouter);

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