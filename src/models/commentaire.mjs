import mongoose from "mongoose";
const CommentaireSchema = new mongoose.Schema({

    titreReserve: {
        type: mongoose.Schema.Types.String,
        required: false
    },

    commentaires: {
        type: mongoose.Schema.Types.Array,
        required: false
    },

    observateurId: {
        type: mongoose.Schema.Types.String,
        required: false
    }

});

export const Commentaire = mongoose.model("Commentaire", CommentaireSchema);