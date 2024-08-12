import mongoose from "mongoose";
const AccessoireSchema = new mongoose.Schema({

    observateurId: {
        type: mongoose.Schema.Types.String,
        required: false
    },

    liste : {
        type: mongoose.Schema.Types.Array,
        required: false
    }

});

export const Accessoire = mongoose.model("Accessoire_Famille_Ac1", AccessoireSchema);