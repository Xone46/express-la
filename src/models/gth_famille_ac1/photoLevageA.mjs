import mongoose from "mongoose";
const PhotoLevageASchema = new mongoose.Schema({

    filename : {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    mimetype : {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    observateurId : {
        type : mongoose.Schema.Types.String,
        required : false,
    }

})

export const PhotoLevageA = mongoose.model("PhotoLevageA", PhotoLevageASchema);


