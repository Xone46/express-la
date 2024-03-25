import mongoose from "mongoose";
const ChekinSchema = new mongoose.Schema({

    range : {
        type : mongoose.Schema.Types.Array,
        required : true,
    },

    country : {
        type : mongoose.Schema.Types.String,
        required : true,
    },

    region : {
        type : mongoose.Schema.Types.String,
        required : true,
    },

    eu : {
        type : mongoose.Schema.Types.String,
        required : true,
    },

    timezone : {
        type : mongoose.Schema.Types.String,
        required : true,
    },

    city : {
        type : mongoose.Schema.Types.String,
        required : true,
    },

    ll : {
        type : mongoose.Schema.Types.Array,
        required : false,
    },

    metro : {
        type : mongoose.Schema.Types.Number,
        required : false,
    },

    area : {
        type : mongoose.Schema.Types.Number,
        required : false,
    }
})

export const Chekin = mongoose.model("Chekin", ChekinSchema);