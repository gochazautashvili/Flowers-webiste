import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    cartUserID: { type: mongoose.Types.ObjectId, required: true },
    productID: { type: mongoose.Types.ObjectId, required: true },
    title: { type: String, required: true },
    new_price: { type: String, required: true },
    old_price: { type: String },
    category: { type: Array, required: true },
    searchWords: { type: [String], required: true },
    mainImg: { type: String, required: true },
})

export default mongoose.model("Wishlist", ProductSchema)