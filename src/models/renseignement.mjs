import mongoose from "mongoose";
const RenseignementSchema = new mongoose.Schema({

    constructeur : {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    typeConstructeur : {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    anneeMiseService : {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    numeroSerie : {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    numeroInterne : {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    numeroInterneAutre : {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    localisation : {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    typeAppareil : {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    typeAppareilAutre : {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    miseEnServiceRapport : {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    miseEnServiceEpreuves : {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    miseEnServiceEpreuvesAutre : {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    dateDerniereVerficationPeriodique : {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    dateDerniereVerficationPeriodiqueAutre : {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    dateDerniereVerficationPeriodiqueRapport : {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    essaischarge : {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    essaischargeAutre : {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    modification : {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    modificationAutre : {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    
    observateurId : {
        type : mongoose.Schema.Types.String,
        required : false,
    }

})

export const Renseignement = mongoose.model("Renseignement", RenseignementSchema);