
import mongoose from 'mongoose';
import User from '../models/Users.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const Signup = async (req, res, next) => {

    try {
        const salt = bcrypt.genSaltSync(10);
        console.log(req.body,"1");
        console.log({...req.body},"2");
        const hash =await bcrypt.hashSync(req.body.password, salt)
        var newUser = await User.create({ ...req.body, password: hash });
        await newUser.save();
        res.status(200).send(newUser);
    } catch (err) {
        next(err);
    }
}

export const login = async (req, res, next) => {
    try {
        console.log(req.body.email);
        const user1 = await User.findOne({ email: req.body.email })
        console.log(user1);
        if (user1) {
            const isCorrect = await bcrypt.compare(req.body.password, user1.password)
            if (!isCorrect) {
                // res.json("wrong credentials")
                return res.status(400).json({ errors: "wrong credentials" })
            }
            else {
                const token = jwt.sign({ id: user1._id }, process.env.JWT);
                const { password, ...others } = user1._doc;
                res.cookie("access_token", token, {
                    httpOnly: true
                }).status(200).json(others);
            }
        }
        else {
            console.log("no such user");
        }
    } catch (err) {
        next(err);
    }
}

export const loginwithgoogle = async (req, res, next) => {
    try {
        const guser = await User.findOne({ email: req.body.email })
        if (guser) {
            const token = jwt.sign({ id: guser._id }, process.env.JWT);

            res.cookie("access_token", token, {
                httpOnly: true
            }).status(200).json(guser._doc);
        }
        else {
            const newUser1 = await User.create({ ...req.body, fromGoogle: true });

            const savedUser = await newUser1.save();
            const token = jwt.sign({ id: savedUser._id }, process.env.JWT);

            res.cookie("access_token", token, {
                httpOnly: true
            }).status(200).json(savedUser._doc);

        }
    } catch (err) {
        next(err);
    }
}