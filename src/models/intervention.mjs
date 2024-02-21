import mongoose from "mongoose";
const InterventionSchema = new mongoose.Schema({

    date : {
        type : mongoose.Schema.Types.Date,
        required : true,
    },

    numeroAffaire : {
        type : mongoose.Schema.Types.String,
        required : true,
    },

    site : {
        type : mongoose.Schema.Types.String,
        required : true,
    },

    etablissement : {
        type : mongoose.Schema.Types.String,
        required : true,
    },

    repere : {
        type : mongoose.Schema.Types.String,
        required : true,
    },

    adresse : {
        type : mongoose.Schema.Types.String,
        required : true,
    },

    codePostal : {
        type : mongoose.Schema.Types.String,
        required : true,
    },

    ville : {
        type : mongoose.Schema.Types.String,
        required : true,
    },
    
    metier : {
        type : mongoose.Schema.Types.String,
        required : true,
    }
})

export const Intervention = mongoose.model("Intervention", InterventionSchema);