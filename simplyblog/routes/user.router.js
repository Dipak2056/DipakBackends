import express from 'express';
const router = express.Router();
import {createUser,deleteUser} from '../models/user.models.js'
// create a user
router.post("/",async(req,res,next)=>{
    try {
        const result = await createUser(req.body);
        res.json({
            status:'success',
            message:'User creatd successfully!',
            result
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
})
// get a user by id
// delete a user 

export default router
