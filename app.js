import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import morgan from "morgan";
import admin from "./apps/admin/admin.js";
const app=express()
const port = process.env.PORT||3000
dotenv.config();
const databaseurl=process.env.MONGODB;
mongoose.connect(databaseurl).then(()=>{
    console.log("Connected");
}).catch((err)=>{
    console.log(err);  
})
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'))
app.use('/admin/api',admin)

app.listen(port, () => console.log(`Server Runing on PORT ${port}`))