import express from "express";
const router = express.Router();
import {
  getBlog,
  getBlogs,
  insertBlog,
  updateBlog,
  deleteBlog,
} from "../models/post.models.js";
import { getUSer } from "../models/user.models.js";
import { verifyPassword } from "../config/bcrypt.js";
// create a new post
router.post("/addPost", async (req, res, next) => {
  if (req.body.email && req.body.password) {
    let { email, password, ...rest } = req.body;
    //check and get the id of the user to insert here as authorid
    let userExist = await getUSer({ email: email });
    // lets verify the user
    if (verifyPassword(password, userExist.password)) {
      let authorID = userExist._id;
      rest.authorID = authorID;
      const result = await insertBlog(rest);
      res.json({
        status: "success",
        message: "you have successfully added a blog post.",
        result,
      });
    } else {
      res.json({
        status: "success",
        message:
          "The password you have provided doesnot match to create a post.",
      });
    }
  } else {
    res.json({
      status: "success",
      message: "Please provide your email and password to add a blog post.",
    });
  }
});
// get all the posts
router.get("/blogs", async (req, res, next) => {
  try {
    const result = await getBlogs();
    res.json({
      status: "success",
      message: "fetched all posts",
      result,
    });
  } catch (error) {
    next(error);
  }
});
// update a post
router.put("/update",async(req,res,next)=>{
  try {
    const { email, password, blogID, authorID,...rest } = req.body;
    const author = await getUSer({ _id: authorID });
    if (author.email === email) {
      if (verifyPassword(password,author.password)) {
        const result = await updateBlog(blogID,rest)
        res.json(result);
        return
        result &&
          res.json({
            status: "success",
            message: "You have updated a blog.",
          });
      } else {
        res.json({
          status:'success',
          message:'Dont use whatever password.'
        })
      }
    } else {
      res.json({
        status:'success',
        message:'You are not author of this blog, so you cannot delete this blog.'
      })
    }
  } catch (error) {
    next(error);
  }
})

// delete a post
router.delete("/delete", async (req, res, next) => {
  try {
    const { email, password, blogId, authorID } = req.body;
    const author = await getUSer({ _id: authorID });
    if (author.email === email) {
      if (verifyPassword(password,author.password)) {
        const result = await deleteBlog({ _id: blogId });
        result &&
          res.json({
            status: "success",
            message: "You have deleted a blog",
          });
      } else {
        res.json({
          status:'success',
          message:'Dont use whatever password.'
        })
      }
    } else {
      res.json({
        status:'success',
        message:'You are not author of this blog, so you cannot delete this blog.'
      })
    }
  } catch (error) {
    next(error);
  }
});
// get single blog post
router.get("/:_id", async (req, res, next) => {
  try {
    const filter = { _id: req.params._id };
    const result = await getBlog(filter);
    result && res.json({
      status: "success",
      message: "Got blog according to id",
      result,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
