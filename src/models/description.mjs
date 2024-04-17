import mongoose from "mongoose";
const DescriptiontSchema = new mongoose.Schema({
    
    marquage : {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    modeDeLevage : {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    caracteristiques : {
        type : mongoose.Schema.Types.Array,
        required : false,
    },

    levageAuxiliaire : {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    detailsLevageAuxiliaire : {
        type : mongoose.Schema.Types.Array,
        required : false,
    },

    modeInstallation : {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    pose : {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    suspendu : {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    surMonorail : {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    surPointFixe : {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    surPotence : {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    surPortique : {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    autre : {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    sourceDenergie : {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    detailSourceDenergie : {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    autreSourceDenergie : {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    observateurId : {
        type : mongoose.Schema.Types.String,
        required : false
    }

});

export const Description = mongoose.model("Description", DescriptiontSchema);