import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    userID: { type: mongoose.Types.ObjectId, required: true },
    title: { type: String, required: true },
    new_price: { type: String, required: true },
    old_price: { type: String },
    category: { type: [String], required: true },
    searchWords: { type: [String], required: true, default: ["ყვავილი", "ყვავილები"] },
    mainImg: { type: String },
})

export default mongoose.model("Products", ProductSchema)