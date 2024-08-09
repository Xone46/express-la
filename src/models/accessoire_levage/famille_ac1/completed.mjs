import mongoose from "mongoose";
const CompletedSchema = new mongoose.Schema({

    observateurId : {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    renseignement : {
        type : mongoose.Schema.Types.Boolean,
        required : false,
    },

    accessoire : {
        type : mongoose.Schema.Types.Boolean,
        required : false,
    },

    fiche : {
        type : mongoose.Schema.Types.Boolean,
        required : false,
    },

    photo : {
        type : mongoose.Schema.Types.Boolean,
        required : false,
    }

});

export const Completed = mongoose.model("Completed_Famille_Ac1", CompletedSchema);