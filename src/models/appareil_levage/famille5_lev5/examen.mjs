import mongoose from "mongoose";
const ExamenFamilleFiveLevFive_Schema = new mongoose.Schema({
    a : {
        type : mongoose.Schema.Types.Array,
        required : false,
    },

    b : {
        type : mongoose.Schema.Types.Array,
        required : false,
    },

    c : {
        type : mongoose.Schema.Types.Array,
        required : false,
    },

    d : {
        type : mongoose.Schema.Types.Array,
        required : false,
    },

    e : {
        type : mongoose.Schema.Types.Array,
        required : false,
    },
    
    f : {
        type : mongoose.Schema.Types.Array,
        required : false,
    },

    g : {
        type : mongoose.Schema.Types.Array,
        required : false,
    },

    h : {
        type : mongoose.Schema.Types.Array,
        required : false,
    },

    i : {
        type : mongoose.Schema.Types.Array,
        required : false,
    },

    j : {
        type : mongoose.Schema.Types.Array,
        required : false,
    },

    observateurId : {
        type : mongoose.Schema.Types.String,
        required : false,
    }
})

export const ExamenFamilleFiveLevFive = mongoose.model("ExamenFamilleFiveLevFive", ExamenFamilleFiveLevFive_Schema);