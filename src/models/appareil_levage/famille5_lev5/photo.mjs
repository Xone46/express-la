import mongoose from "mongoose";
const PhotoFamilleFiveLevFive_Schema = new mongoose.Schema({
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

export const PhotoFamilleFiveLevFive = mongoose.model("PhotoFamilleFiveLevFive", PhotoFamilleFiveLevFive_Schema);