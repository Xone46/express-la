import mongoose from "mongoose";
const FicheSchema = new mongoose.Schema({

    observateurId: {
        type: mongoose.Schema.Types.String,
        required: false
    },

    fiches : {
        type: mongoose.Schema.Types.Array,
        required: false
    }

});

export const Fiche = mongoose.model("FicheFamilleAc1", FicheSchema);