import mongoose from "mongoose";

const CompletedLevageASchema = new mongoose.Schema({

    renseignement : {
        type : mongoose.Schema.Types.Boolean,
        required : false,
    },

    examen : {
        type : mongoose.Schema.Types.Boolean,
        required : false,
    },

    accessoire : {
        type : mongoose.Schema.Types.Boolean,
        required : false,
    },

    description : {
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
    },

    observateurId : {
        type : mongoose.Schema.Types.String,
        required : false,
    }

});

export const CompletedLevageA = mongoose.model("CompletedLevageA", CompletedLevageASchema);