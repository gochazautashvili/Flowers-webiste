import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose";
import userRouter from './routes/userRouter.js'
import ProductRouter from './routes/ProductRouter.js'
import CartRouter from './routes/CartRouter.js'
import WishlistRouter from './routes/WishlistRouter.js'
import compression from "compression";

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(compression())

const PORT = process.env.PORT || 8000

// all routes
app.use("/auth", userRouter)
app.use("/product", ProductRouter)
app.use("/cart", CartRouter)
app.use("/wishlist", WishlistRouter)

//
app.get('/', (req, res) => {
    res.send("This is api home page")
})

mongoose.connect(process.env.MONGODB_URL).then(() => {
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server is running on port: ${PORT} & database is connected`);
    })
})