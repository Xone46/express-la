import mongoose from "mongoose";
const RenseignementLevageASchema = new mongoose.Schema({

    etablissement : {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    adresse : {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    etendueVerification : {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    personneCompteRendu : {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    nomVerificateur : {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    rapportPrecedent : {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    datePrecedenteVerification : {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    documents : {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    dateDuree : {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    observateurId : {
        type : mongoose.Schema.Types.String,
        required : false,
    }

})

export const RenseignementLevageA = mongoose.model("RenseignementLevageA", RenseignementLevageASchema);


