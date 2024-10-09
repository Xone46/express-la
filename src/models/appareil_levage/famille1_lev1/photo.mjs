import mongoose from "mongoose";
const Photo_famille_one_lev_one_Schema = new mongoose.Schema({
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

export const Photo = mongoose.model("Photo_famille_one_lev_one", Photo_famille_one_lev_one_Schema);