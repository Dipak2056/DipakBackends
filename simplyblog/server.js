import 'dotenv/config'
import express from 'express';
import { dbConnect } from './config/dbconfig.js';
const app = express();

app.use(express.json());
// db connection
dbConnect();
// global route
app.get("/",(req,res)=>{
    res.json({
        status: 'success',
        message: 'welcome to the simply blog backend!'
    })
})
// server listen
const PORT = process.env.PORT
app.listen(process.env.PORT || 5000, (error)=>{
    error ? console.log(error) : console.log(`server is running in port ${PORT}`)
})