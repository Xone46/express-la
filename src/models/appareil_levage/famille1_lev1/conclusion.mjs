import mongoose from "mongoose";
const ConclusionFamilleOneLevOne_Schema = new mongoose.Schema({

    a: {
        type: mongoose.Schema.Types.String,
        required: false
    },

    b: {
        type: mongoose.Schema.Types.String,
        required: false
    },

    c: {
        type: mongoose.Schema.Types.String,
        required: false
    },

    d: {
        type: mongoose.Schema.Types.String,
        required: false
    },

    e: {
        type: mongoose.Schema.Types.String,
        required: false
    },

    f: {
        type: mongoose.Schema.Types.String,
        required: false
    },

    g: {
        type: mongoose.Schema.Types.String,
        required: false
    },

    poids: {
        type: mongoose.Schema.Types.String,
        required: false
    },

    commentaire: {
        type: mongoose.Schema.Types.String,
        required: false
    },

    observateurId: {
        type: mongoose.Schema.Types.String,
        required: false
    },

    child: {
        type: mongoose.Schema.Types.Array,
        required: false
    }

});

export const ConclusionFamilleOneLevOne = mongoose.model("ConclusionFamilleOneLevOne", ConclusionFamilleOneLevOne_Schema);