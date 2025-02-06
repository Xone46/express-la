import mongoose from "mongoose";
import con from "../controllers/dbsite.mjs";


const OneSchema = new mongoose.Schema({

      email: {
            type: String,
            required: false
      },

      nom: {
            type: String,
            required: false
      },

      prenom: {
            type: String,
            required: false
      },


      nested: {
            type: Array,
            required: false
      },

      partager: {
            type: Array,
            required: false
      },

      originalname: {
            type: String,
            required: false
      },

      filename: {
            type: String,
            required: false
      },

      location: {
            type: String,
            required: false
      },

      interlocuteurId: {
            type: String,
            required: false
      },

      type: {
            type: String,
            required: false
      },

      parent: {
            type: String,
            required: false
      },

      date: {
            type: Date,
            default: Date.now
      }
});

export const One = con.model("One", OneSchema, "ones");
