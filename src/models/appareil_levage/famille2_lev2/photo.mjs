import mongoose from "mongoose";
const PhotoFamilleTowLevTow_Schema = new mongoose.Schema({
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

export const PhotoFamilleTowLevTow = mongoose.model("PhotoFamilleTowLevTow", PhotoFamilleTowLevTow_Schema);