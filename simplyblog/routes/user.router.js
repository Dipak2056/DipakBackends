import express, { request } from "express";
const router = express.Router();
import { createUser, deleteUser } from "../models/user.models.js";
import { encryptPassword } from "../config/bcrypt.js";
import { deleteMultipleBlogs } from "../models/post.models.js";
// create a user
router.post("/", async (req, res, next) => {
  try {
    // we want to insert the hashed password
    let encryptedPass = await encryptPassword(req.body.password);
    req.body.password = encryptedPass;
    const result = await createUser(req.body);
    result._id &&
      res.json({
        status: "success",
        message: "User creatd successfully!",
        result,
      });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error")) {
      error.message = "Email already exists";
    }
    next(error);
  }
});
// delete a user
router.post("/delete", async (req, res, next) => {
  try {
    const deleteObject = {
      _id: req.body._id,
    };

    const deleteResult = await deleteMultipleBlogs(req.body);
    const result = await deleteUser(deleteObject);
     result
      ? res.json({
          status: "success",
          message: `user deleted successfully with ${deleteResult.deletedCount} blogs.`,
          result,
        })
      : res.json({
          status: "success",
          message: "this user is not in the database",
        });
  } catch (error) {
    next(error);
  }
});

export default router;
