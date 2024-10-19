import mongoose from "mongoose";
const DescriptionFamilleFourLevFour_Schema = new mongoose.Schema({

    marquage: {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    chargeMaximaleUtile: {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    hauteurElevation: {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    extensionPlateforme: {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    deversAutorise: {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    nombrePersonnes: {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    nombrePersonnes: {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    portee: {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    mecanismes: {
        type : mongoose.Schema.Types.Array,
        required : false,
    },

    sourceEnergie: {
        type : mongoose.Schema.Types.Array,
        required : false,
    },

    translation: {
        type : mongoose.Schema.Types.Array,
        required : false,
    },

    chainesCablesElevation: {
        type : mongoose.Schema.Types.Array,
        required : false,
    },

    caracteristiquesSuspenteOne: {
        type : mongoose.Schema.Types.Array,
        required : false,
    },

    caracteristiquesSuspenteTow: {
        type : mongoose.Schema.Types.Array,
        required : false,
    },

    siPresence: {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    observateurId: {
        type : mongoose.Schema.Types.String,
        required : false
    }

});

export const DescriptionFamilleFourLevFour = mongoose.model("DescriptionFamilleFourLevFour", DescriptionFamilleFourLevFour_Schema);