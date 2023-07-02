import express from "express";
const router = express.Router();
import {
  getBlog,
  getBlogs,
  insertBlog,
  updateBlog,
  deleteBlog,
} from "../models/post.models.js";
// create a new post
router.post('/',async(req,res,next)=>{
    try {
        const result = await insertBlog(req.body)
        console.log(result)
        res.json({
            status:'success',
            message: 'you have successfully added a blog post.'
        })
    } catch (error) {
        next(error)
    }
})
// get all the posts
router.get('/blogs',async(req,res,next)=>{
    try {
        const result = await getBlogs();
        res.json({
            status:'success',
            message:'fetched all posts',
            result
        })
    } catch (error) {
        next(error);

    }
})
// update a post
// delete a post
// get single blog post
router.get("/:_id",async(req,res,next)=>{
    try {
        const filter = {_id:req.params._id}
        const result = await getBlog(filter);
        res.json({
            status:'success',
            message:'Got blog according to id',
            result
        })
    } catch (error) {
        next(error)
    }
})
// get all the blog post

export default router
