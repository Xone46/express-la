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

export const Photo = mongoose.model("Photo_Famille2_Lev2", PhotoSchema);