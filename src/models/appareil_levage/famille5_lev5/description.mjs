import mongoose from "mongoose";
const DescriptionFamilleFiveLevFive_Schema = new mongoose.Schema({

    marquage: {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    chargeMaximaleUtile: {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    hauteurLeveeMaximale: {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    levage: {
        type : mongoose.Schema.Types.Array,
        required : false,
    },

    sourceEnergie: {
        type : mongoose.Schema.Types.Array,
        required : false,
    },

    dispositifElevation: {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    transmissionElevation: {
        type : mongoose.Schema.Types.Array,
        required : false,
    },

    nombreChainesCables: {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    chargeRupture: {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    coefficientUtilisation: {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    organesSuspension: {
        type : mongoose.Schema.Types.Array,
        required : false,
    },

    supoprtCharge: {
        type : mongoose.Schema.Types.Array,
        required : false,
    },

    levageAuxiliaire: {
        type : mongoose.Schema.Types.Array,
        required : false,
    },

    observateurId: {
        type : mongoose.Schema.Types.String,
        required : false
    }

});

export const DescriptionFamilleFiveLevFive = mongoose.model("DescriptionFamilleFiveLevFive", DescriptionFamilleFiveLevFive_Schema);