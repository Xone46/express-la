import mongoose from "mongoose";
const ReserveSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },

  etat: {
    type: String,
    required: false,
  },

  status: {
    type: String,
    required: false,
  },

  dateCreated: {
    type: mongoose.Schema.Types.Date,
    default: new Date()
  }
  
})

export const Reserve = mongoose.model("Reserve", ReserveSchema);