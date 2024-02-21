import mongoose from "mongoose";
const InspecteurSchema = new mongoose.Schema({

    email : {
        type : mongoose.Schema.Types.String,
        required : true,
    },

    password : {
        type : mongoose.Schema.Types.String,
        required : true,
    },

    nom : {
        type : mongoose.Schema.Types.String,
        required : true,
    },

    prenom : {
        type : mongoose.Schema.Types.String,
        required : true,
    }

})

export const Inspecteur = mongoose.model("Inspecteur", InspecteurSchema);