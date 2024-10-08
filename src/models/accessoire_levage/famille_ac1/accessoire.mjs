import mongoose from "mongoose";
const AccessoireSchema = new mongoose.Schema({

    observateurId: {
        type: mongoose.Schema.Types.String,
        required: false
    },

    accessoires : {
        type: mongoose.Schema.Types.Array,
        required: false
    }

});

export const Accessoire = mongoose.model("AccessoireFamilleAc1", AccessoireSchema);