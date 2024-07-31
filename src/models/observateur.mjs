import mongoose from "mongoose";
const ObservateurSchema = new mongoose.Schema({

    typeAppareil: {
        type : mongoose.Schema.Types.String,
        required : false
    },

    metier: {
        type : mongoose.Schema.Types.String,
        required : false
    },

    coordonnees: {
        type : mongoose.Schema.Types.String,
        required : false
    },

    equipement: {
        type : mongoose.Schema.Types.String,
        required : false
    },

    constructeur : {
        type : mongoose.Schema.Types.String,
        required : false
    },

    date: {
        type : mongoose.Schema.Types.Date,
        required : false
    },

    interventionId : {
        type : mongoose.Schema.Types.String,
        required : false
    },

    localisation : {
        type : mongoose.Schema.Types.String,
        required : false
    },

    marquage : {
        type : mongoose.Schema.Types.String,
        required : false
    },

    numeroInterne : {
        type : mongoose.Schema.Types.String,
        required : false
    },

    numeroSerie : {
        type : mongoose.Schema.Types.String,
        required : false
    },

    typeVerification : {
        type : mongoose.Schema.Types.String,
        required : false
    },

    accompagnateurClient : {
        type : mongoose.Schema.Types.String,
        required : false
    },

    accompagnateurInspecteur : {
        type : mongoose.Schema.Types.String,
        required : false
    },

    typeRapport : {
        type : mongoose.Schema.Types.String,
        required : false
    },

    etat : {
        type : mongoose.Schema.Types.Boolean,
        default : false,
        required : false
    },

    cache : {
        type : mongoose.Schema.Types.Boolean,
        default : false,
        required : false
    }

})

export const Observateur = mongoose.model("Observateur", ObservateurSchema);

