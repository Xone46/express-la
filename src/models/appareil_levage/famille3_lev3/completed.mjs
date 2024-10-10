import mongoose from "mongoose";
const CompletedFamilleTreeLevTree_Schema = new mongoose.Schema({

    observateurId : {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    renseignement : {
        type : mongoose.Schema.Types.Boolean,
        required : false,
    },

    description : {
        type : mongoose.Schema.Types.Boolean,
        required : false,
    },

    examen : {
        type : mongoose.Schema.Types.Boolean,
        required : false,
    },

    conclusion : {
        type : mongoose.Schema.Types.Boolean,
        required : false,
    },

    photo : {
        type : mongoose.Schema.Types.Boolean,
        required : false,
    }
});

export const CompletedFamilleTreeLevTree = mongoose.model("CompletedFamilleTreeLevTree", CompletedFamilleTreeLevTree_Schema);