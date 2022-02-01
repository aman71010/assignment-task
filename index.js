import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoute from "./Routes/auth.js";
import userRoute from "./Routes/User.js";

dotenv.config();

const app =  express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

const URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 8080;

if(process.env.NODE_ENV == "production"){
    app.use(express.static("client/build"));
}

mongoose.connect(URL).then(()=>{
    app.listen(PORT, ()=>{
        console.log("Backend server is running successfully");
        console.log("DB connection successfully");
    });
}).catch((err)=>{console.log(err)});