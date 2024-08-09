import mongoose from "mongoose";
const RenseignementSchema = new mongoose.Schema({

    observateurId: {
        type: mongoose.Schema.Types.String,
        required: false
    },

    etablissement: {
        type: mongoose.Schema.Types.String,
        required: false
    },

    adresse: {
        type: mongoose.Schema.Types.String,
        required: false
    },

    etendueVerification: {
        type: mongoose.Schema.Types.String,
        required: false
    },

    accompagnateurClient: {
        type: mongoose.Schema.Types.String,
        required: false
    },

    personneCompteRendu: {
        type: mongoose.Schema.Types.String,
        required: false
    },

    nomVerificateur: {
        type: mongoose.Schema.Types.String,
        required: false
    },

    rapportPrecedent: {
        type: mongoose.Schema.Types.String,
        required: false
    },

    datePrecedenteVerification: {
        type: mongoose.Schema.Types.Date,
        required: false
    },

    documents: {
        type: mongoose.Schema.Types.String,
        required: false
    },

    dateDuree: {
        type: mongoose.Schema.Types.Date,
        required: false
    }


});

export const Renseignement = mongoose.model("Renseignement_Famille_Ac1", RenseignementSchema);