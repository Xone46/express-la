import mongoose from "mongoose";
const BdSchema = new mongoose.Schema({
    date: {
        type : mongoose.Schema.Types.Date,
        default : new Date()
    }

})

export const Bd = mongoose.model("Bd", BdSchema);

