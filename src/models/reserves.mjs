import mongoose from 'mongoose';
import { connectAtlasDB } from '../../src/dbAtlas.mjs';  // Import the connection function

// Author schema
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
    
});

// Create and return the Author model
export const createReserveModel = async () => {
    const atlasConnection = await connectAtlasDB();  // Connect to MongoDB Atlas
    const Reserve = atlasConnection.model('Reserve', ReserveSchema);
    return Reserve;
};