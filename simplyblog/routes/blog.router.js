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
    let userExist = await getUSer({'email':email});
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
// delete a post
// get single blog post
router.get("/:_id", async (req, res, next) => {
  try {
    const filter = { _id: req.params._id };
    const result = await getBlog(filter);
    res.json({
      status: "success",
      message: "Got blog according to id",
      result,
    });
  } catch (error) {
    next(error);
  }
});
// get all the blog post

export default router;
