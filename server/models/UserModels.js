import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cart: { type: Array },
    wishlist: { type: Array },
})

export const UserModel = mongoose.model("users", UserSchema)
