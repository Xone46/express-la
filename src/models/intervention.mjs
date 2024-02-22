import mongoose from "mongoose";
const InterventionSchema = new mongoose.Schema({

    date : {
        type : mongoose.Schema.Types.Date,
        required : false,
    },

    numeroAffaire : {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    site : {
        type : mongoose.Schema.Types.Number,
        required : false,
    },

    etablissement : {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    repere : {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    adresse : {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    codePostal : {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    ville : {
        type : mongoose.Schema.Types.String,
        required : false,
    },
    
    metier : {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    dateCreated : {
        type : mongoose.Schema.Types.Date,
        default : new Date()
    },
})

export const Intervention = mongoose.model("Intervention", InterventionSchema);