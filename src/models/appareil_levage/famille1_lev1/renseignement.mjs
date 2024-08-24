import mongoose from "mongoose";
const RenseignementSchema = new mongoose.Schema({

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
    miseEnServiceRapport: {
        type: mongoose.Schema.Types.String,
        required: false,
    },
    miseEnServiceEpreuves: {
        type: mongoose.Schema.Types.String,
        required: false,
    },
    suiveMiseEnServiceEpreuves: {
        type: mongoose.Schema.Types.String,
        required: false,
    },
    dateDerniereVerficationPeriodique: {
        type: mongoose.Schema.Types.String,
        required: false,
    },
    suiveDateDerniereVerficationPeriodique: {
        type: mongoose.Schema.Types.String,
        required: false,
    },
    rapport: {
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

export const Renseignement = mongoose.model("Renseignement_Famille1_Lev1", RenseignementSchema);