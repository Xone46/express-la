import mongoose from "mongoose";
const PhotoSchema = new mongoose.Schema({
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

export const Photo = mongoose.model("PhotoFamille1Lev1", PhotoSchema);