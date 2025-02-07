import mongoose from 'mongoose';
import { connectAtlasDB } from '../../src/dbAtlas.mjs';  // Import the connection function

// Author schema
const ParentSchema = new mongoose.Schema({

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

    emailInterlocuteur: {
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

// Create and return the Author model
export const createParentModel = async () => {
    const atlasConnection = await connectAtlasDB();  // Connect to MongoDB Atlas
    const Parent = atlasConnection.model('Parent', ParentSchema);
    return Parent;
};