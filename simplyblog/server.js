import 'dotenv/config'
import express from 'express';
import { dbConnect } from './config/dbconfig.js';
const app = express();
import cors from 'cors';

app.use(express.json());
app.use(cors());
// db connection
dbConnect();

// routers
// userRouters
import userRouter from './routes/user.router.js'
// blogRouters
import blogRouter from './routes/blog.router.js'

app.use('/api/v1/user',userRouter)
app.use('/api/v1/blog',blogRouter)

// global route
app.get("/",(req,res)=>{
    res.json({
        status: 'success',
        message: 'welcome to the simply blog backend!'
    })
})
// global error handler
app.get("/",(error,req,res)=>{
    res.json({
        status: 'error',
        message: error.message,
    })
})
// server listen
const PORT = process.env.PORT
app.listen(process.env.PORT || 5000, (error)=>{
    error ? console.log(error) : console.log(`server is running in port ${PORT}`)
})