import express from 'express'
import { UserModel } from '../models/UserModels.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const router = express.Router()

router.post('/register/v1', async (req, res) => {
    const { name, password } = req.body

    try {
        const user = await UserModel.findOne({ name })

        if (user) {
            res.status(400).json('სახელი უკევ არსებობს')
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const NewUser = new UserModel({ name, password: hashPassword })
        await NewUser.save()

        res.status(200).json("now login")
    } catch (error) {
        console.log(error);
    }
})

router.post('/login', async (req, res) => {
    const { name, password } = req.body

    try {
        const user = await UserModel.findOne({ name })

        if (!user) {
            res.status(400).json("მსგავსი სახელი არ არსებობს")
        }

        const comparePassword = await bcrypt.compare(password, user.password)

        if (!comparePassword) {
            res.status(400).json("პაროლი ან სახელი არასწორია")
        }

        const token = jwt.sign({ id: user._id }, process.env.SECRET)

        res.status(200).json({ token, name, userID: user._id })
    } catch (error) {
        console.log(error);
    }
})

export default router