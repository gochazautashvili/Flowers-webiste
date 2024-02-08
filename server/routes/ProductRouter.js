import express from 'express'
import ProductModules from '../models/ProductModules.js'
import multer from 'multer'
import path from 'path'
import auth from '../middleware/auth.js'
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: 'dxesljzkl',
    api_key: '728676652369458',
    api_secret: 'zTfM2n1vKfQV0OvAmeRB7hz4YEs'
});

const router = express.Router()

// const storage = multer.diskStorage({
//     destination: (req, file, cd) => {
//         cd(null, 'public/images')
//     },
//     filename: (req, file, cd) => {
//         cd(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
//     }
// })

// const upload = multer({
//     storage: storage
// })

const upload = multer({ dest: 'uploads/' });


router.post('/', auth, upload.single('image'), async (req, res) => {

    const { title, category, searchWords, new_price, old_price, userID } = req.body

    try {

        // cloudinery

        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "images",
            // width: 300,
            // crop: "scale"
        })

        // my code
        if (!title || !category || !new_price || !userID || !result) {
            res.status(400).json("სახელი კატეგორია ფასი და სურათი აუცილებელია & {ასევე რეგისტრაციააა საჭირო}")
        } else {
            const CreateProduct = new ProductModules({ mainImg: result.secure_url, title, new_price, old_price, category, searchWords: searchWords.split(','), userID })
            await CreateProduct.save()
            res.status(201).json("პროდუცტი შეიქმნა")
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error })
    }
})

router.get('/', async (req, res) => {
    const { skip, limit } = req.query;

    try {
        const all_product = await ProductModules.find({}).skip(parseInt(skip)).limit(parseInt(limit))

        if (!all_product) {
            res.status(400).json("პროდუცტები არ არსებობს შეგიძლიათ დაამატოთ")
        }

        res.status(200).json(all_product)
    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
})

router.get("/search", async (req, res) => {
    try {
        const { searchTerm } = req.query;

        const searchResults = await ProductModules.find({ searchWords: { $regex: new RegExp(searchTerm, "i") } });
        res.json(searchResults);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/searchByCategory", async (req, res) => {
    const { searchByCategory } = req.query

    try {
        if (searchByCategory == 'ყველა') {
            const searchCategory = await ProductModules.find({}).limit(20)

            res.status(200).json(searchCategory)
        } else {
            const searchCategory = await ProductModules.find({ category: searchByCategory })

            if (searchCategory == 0) {
                return res.status(400).json("მსგავსი კატეგორიის პროდუქტი ჯერ არ გვაქვს")
            }

            res.status(200).json(searchCategory)
        }
    } catch (error) {
        res.status(400).json(error)
        console.log(error);
    }
})

router.get("/single_product", async (req, res) => {
    const { productID } = req.query

    try {
        const single_product = await ProductModules.findById({ _id: productID })

        if (!single_product) {
            return res.status(400).json("ფროდუკტი არ არსებობს")
        }

        res.status(200).json(single_product)
    } catch (error) {
        console.log(error);
        res.status(400).json("single product problem")
    }
})

router.get('/category/collection', async (req, res) => {
    const { category } = req.query

    try {
        const category_collection = await ProductModules.find({ category: { $in: category } })

        res.status(200).json(category_collection)
    } catch (error) {
        console.log(error);
    }
})


export default router