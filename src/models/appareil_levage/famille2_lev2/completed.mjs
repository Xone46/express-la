import mongoose from "mongoose";
const Completed_famille_one_lev_one_Schema = new mongoose.Schema({

    observateurId : {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    renseignement : {
        type : mongoose.Schema.Types.Boolean,
        required : false,
    },

    description : {
        type : mongoose.Schema.Types.Boolean,
        required : false,
    },

    examen : {
        type : mongoose.Schema.Types.Boolean,
        required : false,
    },

    conclusion : {
        type : mongoose.Schema.Types.Boolean,
        required : false,
    },

    photo : {
        type : mongoose.Schema.Types.Boolean,
        required : false,
    }
});

export const Completed = mongoose.model("Completed_famille_one_lev_one", Completed_famille_one_lev_one_Schema);