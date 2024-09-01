import mongoose from "mongoose";
const SauvegardeSchema = new mongoose.Schema({

    inspecteurId : {
        type : mongoose.Schema.Types.String,
        required : false
    },

    date: {
        type : mongoose.Schema.Types.Date,
        default : new Date()
    }

})

export const Sauvegarde = mongoose.model("Sauvegarde", SauvegardeSchema);

