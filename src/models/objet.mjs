import mongoose from "mongoose";
const ObjetSchema = new mongoose.Schema({

    date : {
        type : mongoose.Schema.Types.Date,
        required : true,
    },

    type : {
        type : mongoose.Schema.Types.String,
        required : true,
    },

    mission : {
        type : mongoose.Schema.Types.String,
        required : true,
    },

    constructeur : {
        type : mongoose.Schema.Types.String,
        required : true,
    },

    numeroSerie : {
        type : mongoose.Schema.Types.String,
        required : true,
    },

    numeroInterne : {
        type : mongoose.Schema.Types.String,
        required : true,
    },

    localisation : {
        type : mongoose.Schema.Types.String,
        required : true,
    },

    controle : {
        type : mongoose.Schema.Types.String,
        required : true,
    }

})

export const Objet = mongoose.model("Objet", ObjetSchema);