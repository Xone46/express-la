import mongoose from "mongoose";

const AccessoireLevageASchema = new mongoose.Schema({

    liste : {
        type : mongoose.Schema.Types.Array,
        required : false,
    },

    observateurId : {
        type : mongoose.Schema.Types.String,
        required : false,
    }

})

export const AccessoireLevageA = mongoose.model("AccessoireLevageA", AccessoireLevageASchema);

