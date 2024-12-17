import mongoose from "mongoose";
const DescriptionFamilleTowLevTow_Schema = new mongoose.Schema({
    
    marquage: {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    modeLevage: {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    chargeMaximaleUtile: {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    hauteurDeLevage: {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    course: {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    hauteurLevage: {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    portee: {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    porteFaux: {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    longueurCheminRoulement: {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    suspentesLevage: {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    mouflage: {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    diametre: {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    levageAuxilaire: {
        type : mongoose.Schema.Types.Array,
        required : false,
    },

    // mouflageLevageAuxilaire: {
    //     type : mongoose.Schema.Types.String,
    //     required : false,
    // },

    diametreLevageAuxilaire: {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    modeInstallation: {
        type : mongoose.Schema.Types.Array,
        required : false,
    },

    complementModeInstallation: {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    flagComplementModeInstallation: {
        type : mongoose.Schema.Types.Boolean,
        required : false,
    },

    sourceEnergie: {
        type : mongoose.Schema.Types.Array,
        required : false,
    },

    flagcomplementSourceEnergie: {
        type : mongoose.Schema.Types.Boolean,
        required : false,
    },

    complementSourceEnergie: {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    observateurId: {
        type : mongoose.Schema.Types.String,
        required : false,
    }

});

export const DescriptionFamilleTowLevTow = mongoose.model("DescriptionFamilleTowLevTow", DescriptionFamilleTowLevTow_Schema);