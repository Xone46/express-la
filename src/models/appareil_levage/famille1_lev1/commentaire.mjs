import mongoose from "mongoose";
const Commentaire_famille_one_lev_one_Schema = new mongoose.Schema({

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

export const Commentaire_famille_one_lev_one = mongoose.model("Commentaire_famille_one_lev_one", Commentaire_famille_one_lev_one_Schema);