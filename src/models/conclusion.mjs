import mongoose from "mongoose";
const ConclusionSchema = new mongoose.Schema({

    observationsComplémentairesTableSelected: {
        type: mongoose.Schema.Types.Array,
        required: false
    },

    poids: {
        type: mongoose.Schema.Types.String,
        required: false
    },

    conclusionTableSelected: {
        type: mongoose.Schema.Types.Array,
        required: false
    },

    commentaire: {
        type: mongoose.Schema.Types.String,
        required: false
    }

});

export const Conclusion = mongoose.model("Conclusion", ConclusionSchema);