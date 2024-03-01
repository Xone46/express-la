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
        type : mongoose.Schema.Types.Array,
        required : false,
    },

    modeInstallation : {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    modeInstallationDetails : {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    modeInstallationDetailsAutre : {
        type : mongoose.Schema.Types.String,
        required : false,
    },

    sourceDenergie : {
        type : mongoose.Schema.Types.Array,
        required : false,
    },

    observateurId : {
        type : mongoose.Schema.Types.String,
        required : false
    }

});

export const Description = mongoose.model("Description", DescriptiontSchema);

// description: {
//     marquage : null,
//     modeDeLevage : null,
//     caracteristiques : {
//         chargeMaximaleUtile : "",
//         hauteurDeLevage : "",
//         portee : "",
//         porteFaux : "",
//         longueurDuCheminDeRoulement : "",
//         suspentes : "",
//         composition : "",
//         caracteristiquesChainesDeLevage : "",
//         caracteristiquesSangleDeLevage : "",
//         mouflage : "",
//         diametre : ""
//     },
//     levageAuxiliaire : {
//         sansObjet : "",
//         chargeMaximaleUtileDeChaquePalan : "",
//         suspentes : "",
//         composition : "",
//         caracteristiquesChainesDeLevage : "",
//         caracteristiquesSangleDeLevage : "",
//         mouflage : "",
//         diametre : ""
//     },
//     modeInstallation : "",
//     modeInstallationDetails : "",
//     modeInstallationDetailsAutre : "",
//     sourceDenergie :  {
//         value : "",
//         autre : "",
//         levage : "",
//         translation : "",
//         direction : ""
//     }
// },