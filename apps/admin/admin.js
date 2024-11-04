import express from 'express';
import auth from './auth.js'
const admin=express()
admin.use("/v1/auth",auth)
export default admin