import mongoose from "mongoose";
const FicheSchema = new mongoose.Schema({

    observateurId: {
        type: mongoose.Schema.Types.String,
        required: false
    },

    liste : {
        type: mongoose.Schema.Types.Array,
        required: false
    }

});

export const Fiche = mongoose.model("Fiche_Famille_Ac1", FicheSchema);