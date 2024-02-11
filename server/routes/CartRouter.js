import express from 'express'
import CartModuls from '../models/CartModuls.js'
import auth from '../middleware/auth.js'
import dotenv from 'dotenv'
import stripe from 'stripe'
import ProductModel from '../models/ProductModules.js'
dotenv.config()

const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);
const router = express.Router()

router.post('/create-checkout-session', auth, async (req, res) => {
    try {
        const lineItemsPromises = req.body.items.map(async (item) => {
            const storageItem = await ProductModel.findById({ _id: item.productID });

            return {
                price_data: {
                    currency: 'gel',
                    product_data: {
                        name: storageItem.title,
                        images: [storageItem.mainImg],
                    },
                    unit_amount: storageItem.new_price * 100,
                },
                quantity: item.quantity,
            };
        });

        const lineItems = await Promise.all(lineItemsPromises);

        const session = await stripeInstance.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: lineItems,
            success_url: "https://flowers-website-s.vercel.app/flowers",
            cancel_url: "https://flowers-website-s.vercel.app/flowers",
        });

        req.body.items.map(async item => {
            await CartModuls.findOneAndDelete({ productID: item.productID })
        })

        res.json({ url: session.url });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

// 

router.post('/', auth, async (req, res) => {
    const { flowerProp, cartUserID, productID, quantity } = req.body
    const { title, new_price, old_price, category, searchWords, mainImg } = flowerProp;

    try {
        const alreadyInCart = await CartModuls.findOne({ productID })

        if (quantity < 1) {
            return res.status(400).json("რაოდენობა ნორმალურად მიუთითეთ")
        }

        if (alreadyInCart) {
            const updatedCartProduct = await CartModuls.findOneAndUpdate(
                { productID },
                { $inc: { quantity: quantity } },
            );

            return res.status(200).json(updatedCartProduct);
        }

        const cartProduct = await CartModuls.create({
            title, new_price, old_price, category, searchWords, mainImg, cartUserID, productID, quantity
        })

        await cartProduct.save()

        res.status(200).json(cartProduct)
    } catch (error) {
        res.status(400).json(error)
        console.log(error);
    }
})

router.post('/delete', async (req, res) => {
    const { _id } = req.body

    try {
        const deletedCartItem = await CartModuls.findByIdAndDelete({ _id })
        res.status(200).json(deletedCartItem)
    } catch (error) {
        res.status(400).json(error)
        console.log(error);
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const cartProduct = await CartModuls.find({})

        if (!cartProduct) {
            return res.status(404).json("product is not find")
        }

        res.status(200).json(cartProduct)
    } catch (error) {
        res.status(404).json(error)
        console.log(error);
    }
})

export default router