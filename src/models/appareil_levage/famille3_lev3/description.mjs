import mongoose from "mongoose";
const DescriptionFamilleTreeLevTree_Schema = new mongoose.Schema({
    
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

    statusSiPresence: {
        type : mongoose.Schema.Types.Boolean,
        required : false,
    },

    observateurId: {
        type : mongoose.Schema.Types.String,
        required : false
    }

});

export const DescriptionFamilleTreeLevTree = mongoose.model("DescriptionFamilleTreeLevTree", DescriptionFamilleTreeLevTree_Schema);