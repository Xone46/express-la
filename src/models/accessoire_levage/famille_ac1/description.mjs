import mongoose from "mongoose";

const ConclusionLevageASchema = new mongoose.Schema({

    liste : {
        type : mongoose.Schema.Types.Array,
        required : false,
    },

    observateurId : {
        type : mongoose.Schema.Types.String,
        required : false,
    }

})

export const ConclusionLevageA = mongoose.model("ConclusionLevageA", ConclusionLevageASchema);



 