import mongoose from "mongoose";
const PhotoFamilleOneLevOne_Schema = new mongoose.Schema({
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
});

export const PhotoFamilleOneLevOne = mongoose.model("PhotoFamilleOneLevOne", PhotoFamilleOneLevOne_Schema);