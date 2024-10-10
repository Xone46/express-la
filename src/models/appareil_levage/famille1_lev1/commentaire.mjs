import mongoose from "mongoose";
const CommentaireFamilleOneLevOne_Schema = new mongoose.Schema({

    observateurId: {
        type: mongoose.Schema.Types.String,
        required: false
    },

    ref: {
        type: mongoose.Schema.Types.String,
        required: false
    },

    number: {
        type: mongoose.Schema.Types.Number,
        required: false
    },

    titre: {
        type: mongoose.Schema.Types.String,
        required: false
    },

    modelSelected: {
        type: mongoose.Schema.Types.Array,
        required: false
    }

});

export const CommentaireFamilleOneLevOne = mongoose.model("CommentaireFamilleOneLevOne", CommentaireFamilleOneLevOne_Schema);