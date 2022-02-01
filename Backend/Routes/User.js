import express from "express";
import User from "../Models/User.js";
import bcrypt from "bcrypt";
import { verifyTokenAndAdmin } from "./verifyToken.js"; 

const router = express.Router();

//Add User

router.post("/adduser", verifyTokenAndAdmin, async (req, res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        const newUser = new User({
            username: req.body.username,
            number: req.body.number,
            email: req.body.email,
            address: req.body.address,
            password: hashedPassword
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);   
    } catch(err){
        res.status(500).json(err);
    }
});

//DELETE

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try{
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted");
    } catch(err){
      res.status(500).json(err);
    }
    
});

// GET ALL USER

router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try{
      const users = await User.find();
      res.status(200).json(users);
    } catch{
      res.status(500).json(err);
    }
});

export default router;