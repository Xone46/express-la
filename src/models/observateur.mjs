import mongoose from "mongoose";
const ObservateurSchema = new mongoose.Schema({

    categorieAppareil: {
        type : mongoose.Schema.Types.String,
        required : false
    },

    constructeur : {
        type : mongoose.Schema.Types.String,
        required : false
    },

    date: {
        type : mongoose.Schema.Types.Date,
        required : false
    },

    interventionId : {
        type : mongoose.Schema.Types.String,
        required : false
    },

    localisation : {
        type : mongoose.Schema.Types.String,
        required : false
    },

    marquage : {
        type : mongoose.Schema.Types.String,
        required : false
    },

    numeroInterne : {
        type : mongoose.Schema.Types.String,
        required : false
    },

    numeroSerie : {
        type : mongoose.Schema.Types.String,
        required : false
    },

    typeVerification : {
        type : mongoose.Schema.Types.String,
        required : false
    },

    accompagnateur : {
        type : mongoose.Schema.Types.String,
        required : false
    }

})

export const Observateur = mongoose.model("Observateur", ObservateurSchema);

