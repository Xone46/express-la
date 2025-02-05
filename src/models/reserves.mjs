import mongoose from "mongoose";

// Définir un schéma pour la réserve
const reserveSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,  // Le nom est requis
  },

  etat: {
    type: String,
    required: true,  // La date est requise
  },

  status: {
    type: String,
    required: true,  // La date est requise
  },

  date: {
    type: Date,
    required: true,  // La date est requise
  }

});

// Créer le modèle "Reserve" à partir du schéma
const Reserve = mongoose.model('Reserve', reserveSchema, 'reserves');  // Nom de la collection 'reserves'
export default Reserve
