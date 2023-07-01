import mongoose from "mongoose";

// this function will connect to the mongodb database we created
export const dbConnect = () => { 
try {
    console.log('mongodb connected successfully')
    return mongoose.connect(process.env.MONGO_URI)
} catch (error) {
    console.error(error);
    console.log('error connecting to the mongodb server')
} }