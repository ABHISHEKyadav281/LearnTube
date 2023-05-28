
import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userRoutes from './Routes/user.js'
import videoRoutes from './Routes/video.js'
import commentRoutes from './Routes/comment.js'
import authRoutes from './Routes/auth.js'
import cookieParser from "cookie-parser";
// const paymentRoutes=require('./Routes/payment.js')
import paymentRoutes from './Routes/payment.js';


const app = express();
dotenv.config()
 
const connect = () => {
    mongoose.connect(process.env.MONGO)
        .then(() => {
            console.log("connected to db");
        })
}
 
app.use(cookieParser())
app.use(express.json());

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Oringin,X-Requested-With,Content-Type,Accept",
        
    );
    next();  
})  

app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/payment",paymentRoutes)



app.listen(8080,(req,res,next) => {
    try {connect()
    console.log("connected to server")}
    catch (err) {
        next(err);
    }
}) 
