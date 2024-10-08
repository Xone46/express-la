import mongoose from "mongoose";
const CommentaireSchema = new mongoose.Schema({

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

export const Commentaire = mongoose.model("CommentaireFamille1Lev1", CommentaireSchema);