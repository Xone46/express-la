import mongoose from "mongoose";
const PhotoFamilleFourLevFour_Schema = new mongoose.Schema({
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

export const PhotoFamilleFourLevFour = mongoose.model("PhotoFamilleFourLevFour", PhotoFamilleFourLevFour_Schema);