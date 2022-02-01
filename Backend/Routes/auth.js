import express from "express";
import User from "../Models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const router = express.Router();

//LOGIN

router.post("/login", async (req, res) => {
    try{
        const user = await User.findOne({ email: req.body.email });
        if(!user){
            return res.status(401).json("Wrong credentials! email not exits");
        }
        
        const matchPassword = await bcrypt.compare(req.body.password, user.password);

        if(!matchPassword){
            return res.status(401).json("Wrong credentials! wrong password");
        }
        
        const accessToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin
            },
            process.env.JWT_SEC,
            {expiresIn: "300s"}
        );

        const { password, ...others } = user._doc;

        res.status(201).json({...others, accessToken});
    } catch(err){
        res.status(500).json(err);
    }

});

export default router;