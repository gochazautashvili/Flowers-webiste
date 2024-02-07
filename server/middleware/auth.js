import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { UserModel } from '../models/UserModels.js'
dotenv.config()

const auth = async (req, res, next) => {
    const { authorization } = req.headers

    try {
        if (!authorization) {
            res.status(404).json("ჯერ რეგისტრაცია გაიარეთ")
        }

        const token = authorization.split(' ')[1]

        const { id } = jwt.verify(token, process.env.SECRET)

        req.user = await UserModel.findOne({ _id: id }).select("_id")

        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized - User not found' });
        }

        next()
    } catch (error) {
        res.status(400).json(error)
        console.log(error);
    }
}

export default auth