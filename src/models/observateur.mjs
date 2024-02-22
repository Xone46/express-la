import mongoose from "mongoose";
const ObservateurSchema = new mongoose.Schema({

    date : {
        type : mongoose.Schema.Types.Date,
        required : false,
    },

    type : {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    mission : {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    constructeur : {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    numeroSerie : {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    numeroInterne : {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    localisation : {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    controle : {
        type : mongoose.Schema.Types.String,
        required : false,
    }

})

export const Observateur = mongoose.model("Observateur", ObservateurSchema);

