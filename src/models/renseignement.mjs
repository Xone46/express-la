import mongoose from "mongoose";
const RenseignementSchema = new mongoose.Schema({

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

    valueNumeroInterne : {
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

    autreTypeAppareil : {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    modification : {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    description : {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    essaischarge : {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    miseEnService : {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    epreuvemMiseEnService : {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    dateDerniereVerficationPeriodique : {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    realiseesMiseEnService : {
        type : mongoose.Schema.Types.Date,
        required : false,
    },

    epreuveDateDerniereVerficationPeriodique : {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    realiseesDateDerniereVerficationPeriodique : {
        type : mongoose.Schema.Types.Date,
        required : false,
    },

    poidsKg : {
        type : mongoose.Schema.Types.Number,
        required : false,
    },

    observateurId : {
        type : mongoose.Schema.Types.String,
        required : false,
    }

})

export const Renseignement = mongoose.model("Renseignement", RenseignementSchema);