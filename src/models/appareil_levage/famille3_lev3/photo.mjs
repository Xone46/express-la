import mongoose from "mongoose";
const PhotoFamilleTreeLevTree_Schema = new mongoose.Schema({
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

export const PhotoFamilleTreeLevTree = mongoose.model("PhotoFamilleTreeLevTree", PhotoFamilleTreeLevTree_Schema);