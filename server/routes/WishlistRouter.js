import express from 'express'
import WishlistModules from '../models/WishlistModules.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.post('/', auth, async (req, res) => {
    const { flowerProp, cartUserID, productID } = req.body
    const { title, new_price, old_price, category, searchWords, mainImg } = flowerProp;

    try {
        const alreadyWishlist = await WishlistModules.findOne({ productID })

        if (alreadyWishlist) {
            const deleteWishlist = await WishlistModules.findOneAndDelete({ productID })

            res.status(200).json(deleteWishlist)
        } else {
            const wishlistProduct = await WishlistModules.create({ cartUserID, title, new_price, old_price, category, searchWords, mainImg, productID })

            await wishlistProduct.save() 

            res.status(200).json(wishlistProduct)
        }
    } catch (error) {
        res.status(400).json(error)
        console.log(error);
    }
})

router.get('/', auth, async (req, res) => {
    const wishlistProduct = await WishlistModules.find({})

    if (!wishlistProduct) {
        return
    }

    try {
        res.status(200).json(wishlistProduct)
    } catch (error) {
        res.status(404).json(error)
        console.log(error);
    }
})

export default router