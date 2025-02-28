import mongoose from "mongoose";
const BdSchema = new mongoose.Schema({

    nom : {
        type : mongoose.Schema.Types.String,
        required : false
    },

    path : {
        type : mongoose.Schema.Types.String,
        required : false
    },

    date: {
        type : mongoose.Schema.Types.Date,
        default : new Date()
    }

})

export const Bd = mongoose.model("Bd", BdSchema);

