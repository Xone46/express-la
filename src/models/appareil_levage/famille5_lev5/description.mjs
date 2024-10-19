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

    distanceCentreGravite: {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    chargeMaximalUtileHauteurLeveeMaximale: {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    hauteurLeveeMaximale: {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    chariotsSansMarquage: {
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

    dispositifsElevation: {
        type : mongoose.Schema.Types.Array,
        required : false,
    },

    dispositifPrehension: {
        type : mongoose.Schema.Types.Array,
        required : false,
    },

    equipementsInterchangable: {
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

export const DescriptionFamilleFiveLevFive = mongoose.model("DescriptionFamilleFiveLevFive", DescriptionFamilleFiveLevFive_Schema);