import mongoose from "mongoose";
const DescriptionSchema = new mongoose.Schema({
    
    marquage: {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    chargeMaximaleUtile: {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    porteeMinimale: {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    distanceCentreGravite: {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    course: {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    hauteurLevage: {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    portee: {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    porteFauxDeport: {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    longueurCheminRoulement: {
        type : mongoose.Schema.Types.String,
        required : false,
    },
    
    dimensionPlateau: {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    modeInstallation: {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    suiveModeInstallation : {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    mecanisme : {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    suiveMecanisme : {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    suspentes : {
        type : mongoose.Schema.Types.Array,
        required : false,
    },

    observateurId: {
        type : mongoose.Schema.Types.String,
        required : false,
    }

});

export const Description = mongoose.model("DescriptionFamille3Lev3", DescriptionSchema);