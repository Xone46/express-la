import mongoose from "mongoose";
const RenseignementFamilleFiveLevFive_Schema = new mongoose.Schema({

    constructeur: {
        type: mongoose.Schema.Types.String,
        required: false,
    },

    typeConstructeur: {
        type: mongoose.Schema.Types.String,
        required: false,
    },

    anneeMiseService: {
        type: mongoose.Schema.Types.String,
        required: false,
    },

    numeroSerie: {
        type: mongoose.Schema.Types.String,
        required: false,
    },

    numeroInterne: {
        type: mongoose.Schema.Types.String,
        required: false,
    },

    suiveNumeroInterne: {
        type: mongoose.Schema.Types.String,
        required: false,
    },

    localisation: {
        type: mongoose.Schema.Types.String,
        required: false,
    },

    typeAppareil: {
        type: mongoose.Schema.Types.String,
        required: false,
    },

    suiveTypeAppareil: {
        type: mongoose.Schema.Types.String,
        required: false,
    },

    typeVerification: {
        type: mongoose.Schema.Types.String,
        required: false,
    },

    suiveTypeVerification: {
        type: mongoose.Schema.Types.String,
        required: false,
    },

    documentationTechniqueConstructeur: {
        type: mongoose.Schema.Types.String,
        required: false,
    },

    epreuves: {
        type: mongoose.Schema.Types.String,
        required: false,
    },

    essaischarge: {
        type: mongoose.Schema.Types.String,
        required: false,
    },

    suiveEssaischarge: {
        type: mongoose.Schema.Types.String,
        required: false,
    },

    examenMontageInstallation: {
        type: mongoose.Schema.Types.String,
        required: false,
    },

    modification: {
        type: mongoose.Schema.Types.String,
        required: false,
    },

    suiveModification: {
        type: mongoose.Schema.Types.String,
        required: false,
    },

    observateurId: {
        type: mongoose.Schema.Types.String,
        required: false,
    }

})

export const RenseignementFamilleFiveLevFive = mongoose.model("RenseignementFamilleFiveLevFive", RenseignementFamilleFiveLevFive_Schema);